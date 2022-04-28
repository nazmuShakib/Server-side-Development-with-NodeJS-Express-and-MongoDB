const express = require('express')

const router = express.Router()

router
	.route('/')
	.get((req, res) => {
		res.json({
			message: 'will send all the dishes',
		})
	})
	.post((req, res) => {
		res.json({
			message: 'will add a new dish',
		})
	})
	.put((req, res) => {
		res.json({
			message: 'not supported',
		})
	})
	.delete((req, res) => {
		res.json({
			message: 'will delete all the dishes',
		})
	})
router
	.route('/:dishId')
	.get((req, res) => {
		res.json({
			message: 'will send dish with specific id',
		})
	})
	.post((req, res) => {
		res.json({
			message: 'not supported',
		})
	})
	.put((req, res) => {
		res.json({
			message: 'will update dish with specific id',
		})
	})
	.delete((req, res) => {
		res.json({
			message: 'will delete dish with specific id',
		})
	})
module.exports = router
