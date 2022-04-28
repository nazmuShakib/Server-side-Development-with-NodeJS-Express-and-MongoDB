const express = require('express')
const {
	getAllDishes,
	getDishById,
	addDish,
	updateDish,
	deleteAllDishes,
	deleteDish,
} = require('./helper/dishHelper')

const { verifyAdmin, verifyUser } = require('../middleware/authenticate')

const router = express.Router()

router
	.route('/')
	.get((req, res, next) => {
		getAllDishes(req, res, next)
	})
	.post(verifyUser, verifyAdmin, (req, res, next) => {
		addDish(req, res, next)
	})
	.put(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		deleteAllDishes(req, res, next)
	})
router
	.route('/:dishId')
	.get((req, res, next) => {
		getDishById(req, res, next)
	})
	.post(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.put(verifyUser, verifyAdmin, (req, res, next) => {
		updateDish(req, res, next)
	})
	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		deleteDish(req, res, next)
	})
module.exports = router
