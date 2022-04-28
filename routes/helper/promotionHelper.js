const Promotion = require('../../model/promotions')

const getAllPromotions = async (req, res, next) => {
	try {
		const promotions = await Promotion.find(
			{},
			{
				_id: 0,
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		)
		res.json(promotions)
		next()
	} catch (err) {
		next(err)
	}
}
const addPromotion = async (req, res, next) => {
	try {
		await Promotion.create(req.body)
		res.json({
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
			_id: 0,
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
		res.json(promotion)
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
			res.json({
				message: 'Updated promotion.',
			})
		else next(new Error('Invalid ID.'))
		next()
	} catch (err) {
		next(err)
	}
}
const deleteAllPromotions = async (req, res, next) => {
	try {
		await Promotion.deleteMany({})
		res.json({
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
			res.json({
				message: 'Deleted promotion.',
			})
		else next(new Error('Invalid ID.'))
		next()
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
}
