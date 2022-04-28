const express = require('express')
const {
	getAllDishes,
	getDishById,
	addDish,
	updateDish,
	deleteAllDishes,
	deleteDish,
} = require('./helper/dishHelper')

const router = express.Router()

router
	.route('/')
	.get((req, res, next) => {
		getAllDishes(req, res, next)
	})
	.post((req, res, next) => {
		addDish(req, res, next)
	})
	.put((req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.delete((req, res, next) => {
		deleteAllDishes(req, res, next)
	})
router
	.route('/:dishId')
	.get((req, res, next) => {
		getDishById(req, res, next)
	})
	.post((req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.put((req, res, next) => {
		updateDish(req, res, next)
	})
	.delete((req, res, next) => {
		deleteDish(req, res, next)
	})
module.exports = router
