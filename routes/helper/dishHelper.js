const Dish = require('../../model/dishes')

const getAllDishes = async (req, res, next) => {
	try {
		const dishes = await Dish.find(
			{},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		)
		res.json(dishes)
		next()
	} catch (err) {
		next(err)
	}
}
const addDish = async (req, res, next) => {
	try {
		await Dish.create(req.body)
		res.json({
			message: 'New dish added',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const getDishById = async (req, res, next) => {
	try {
		const dish = await Dish.findById(req.params.dishId, {
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
		res.json(dish)
		next()
	} catch (err) {
		next(err)
	}
}
const updateDish = async (req, res, next) => {
	try {
		if (
			await Dish.findByIdAndUpdate(
				req.params.dishId,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
		)
			res.json({
				message: 'Updated dish.',
			})
		else next(new Error('Invalid ID.'))
		next()
	} catch (err) {
		next(err)
	}
}
const deleteAllDishes = async (req, res, next) => {
	try {
		await Dish.deleteMany({})
		res.json({
			message: 'Deleted all dishes.',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const deleteDish = async (req, res, next) => {
	try {
		if (await Dish.findByIdAndDelete(req.params.dishId))
			res.json({
				message: 'Deleted dish.',
			})
		else next(new Error('Invalid ID.'))
		next()
	} catch (err) {
		next(err)
	}
}
const getComment = async (req, res, next) => {
	try {
		const dishes = await Dish.findById(req.params.dishId, {
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
			.populate('comments.author', '-_id -__v -password -admin')
			.exec()
		if (dishes) {
			res.json(dishes.comments)
			next()
		} else {
			const err = new Error('Dish not found.')
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
		const dish = await Dish.findById(req.params.dishId)
		if (dish) {
			req.body.author = req.user.userID
			await dish.comments.push(req.body)
			await dish.save()
			res.json({
				message: 'New comment posted.',
			})
			next()
		} else {
			const err = new Error('Dish not found')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
const updateComment = async (req, res, next) => {
	try {
		const dish = await Dish.findById(req.params.dishId).populate('comments.author')
		const id1 = dish.comments.id(req.params.commentId).author.id
		const id2 = req.user.userID
		if (id1 === id2) {
			if (dish && dish.comments.id(req.params.commentId) && req.body) {
				if (req.body.rating) dish.comments.id(req.params.commentId).rating = req.body.rating
				if (req.body.comment)
					dish.comments.id(req.params.commentId).comment = req.body.comment
				await dish.save()
				res.json({
					message: 'Updated comment.',
				})
			} else {
				next(new Error('No dishes'))
			}
			next()
		} else {
			const err = new Error('Dish not found.')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
const deleteComment = async (req, res, next) => {
	try {
		const dish = await Dish.findById(req.params.dishId).populate('comments.author')
		const id1 = dish.comments.id(req.params.commentId).author.id
		const id2 = req.user.userID
		if (id1 === id2) {
			if (dish && dish.comments.id(req.params.commentId)) {
				dish.comments.id(req.params.commentId).remove()
				dish.save()
				res.json({
					message: 'Deleted comment.',
				})
			} else {
				next(new Error('No dishes'))
			}
			next()
		} else {
			const err = new Error('Dish not found.')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
module.exports = {
	getAllDishes,
	addDish,
	deleteAllDishes,
	getDishById,
	updateDish,
	deleteDish,
	getComment,
	postComment,
	updateComment,
	deleteComment,
}
