const Promotion = require('../../model/promotions')

const getAllPromotions = async (req, res, next) => {
	try {
		const promotions = await Promotion.find(
			{},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		)
		res.status(200).json(promotions)
		next()
	} catch (err) {
		next(err)
	}
}
const addPromotion = async (req, res, next) => {
	try {
		await Promotion.create(req.body)
		res.status(201).json({
			message: 'New promotion added',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const getPromotionById = async (req, res, next) => {
	try {
		const promotion = await Promotion.findById(req.params.promotionId, {
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
		res.status(200).json(promotion)
		next()
	} catch (err) {
		next(err)
	}
}
const updatePromotion = async (req, res, next) => {
	try {
		if (
			await Promotion.findByIdAndUpdate(
				req.params.promotionId,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
		)
			res.status(200).json({
				message: 'Updated promotion.',
			})
		else {
			const err = new Error('ID not found.')
			err.status = 404
			next(err)
		}
		next()
	} catch (err) {
		next(err)
	}
}
const deleteAllPromotions = async (req, res, next) => {
	try {
		await Promotion.deleteMany({})
		res.status(200).json({
			message: 'Deleted all promotions.',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const deletePromotion = async (req, res, next) => {
	try {
		if (await Promotion.findByIdAndDelete(req.params.promotionId))
			res.status(200).json({
				message: 'Deleted promotion.',
			})
		else {
			const err = new Error('ID not found.')
			err.status = 404
			next(err)
		}
		next()
	} catch (err) {
		next(err)
	}
}
const getComment = async (req, res, next) => {
	try {
		const promotions = await Promotion.findById(req.params.promotionId, {
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
			.populate('comments.author', '-_id -__v -password -admin')
			.exec()
		if (promotions) {
			res.status(200).json(promotions.comments)
			next()
		} else {
			const err = new Error('Promotion not found.')
			err.status = 404
			next(err)
		}
		next()
	} catch (err) {
		next(err)
	}
}
const postComment = async (req, res, next) => {
	try {
		const promotion = await Promotion.findById(req.params.promotionId)
		if (promotion) {
			req.body.author = req.user.userID
			await promotion.comments.push(req.body)
			await promotion.save()
			res.status(200).json({
				message: 'New comment posted.',
			})
			next()
		} else {
			const err = new Error('Promotion not found')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
const updateComment = async (req, res, next) => {
	try {
		const promotion = await Promotion.findById(req.params.promotionId).populate(
			'comments.author'
		)
		const id1 = promotion.comments.id(req.params.commentId).author.id
		const id2 = req.user.userID
		if (id1 === id2) {
			if (promotion && promotion.comments.id(req.params.commentId) && req.body) {
				if (req.body.rating)
					promotion.comments.id(req.params.commentId).rating = req.body.rating
				if (req.body.comment)
					promotion.comments.id(req.params.commentId).comment = req.body.comment
				await promotion.save()
				res.status(200).json({
					message: 'Updated comment.',
				})
			} else {
				const err = new Error('Promotion not found.')
				err.status = 404
				next(err)
			}
			next()
		} else {
			const err = new Error('Promotion not found.')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
const deleteComment = async (req, res, next) => {
	try {
		const promotion = await Promotion.findById(req.params.promotionId).populate(
			'comments.author'
		)
		const id1 = promotion.comments.id(req.params.commentId).author.id
		const id2 = req.user.userID
		if (id1 === id2) {
			if (promotion && promotion.comments.id(req.params.commentId)) {
				promotion.comments.id(req.params.commentId).remove()
				promotion.save()
				res.status(200).json({
					message: 'Deleted comment.',
				})
			} else {
				const err = new Error('Promotion not found.')
				err.status = 404
				next(err)
			}
			next()
		} else {
			const err = new Error('Promotion not found.')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
module.exports = {
	getAllPromotions,
	addPromotion,
	deleteAllPromotions,
	getPromotionById,
	updatePromotion,
	deletePromotion,
	getComment,
	postComment,
	updateComment,
	deleteComment,
}
