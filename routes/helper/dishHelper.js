const Dish = require('../../model/dishes')

const getAllDishes = async (req, res, next) => {
	try {
		const dishes = await Dish.find(
			{},
			{
				_id: 0,
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
			_id: 0,
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
module.exports = {
	getAllDishes,
	addDish,
	deleteAllDishes,
	getDishById,
	updateDish,
	deleteDish,
}
