const express = require('express')

const router = express.Router()

router
	.route('/')
	.get((req, res) => {
		res.json({
			message: 'will send all the promotions',
		})
	})
	.post((req, res) => {
		res.json({
			message: 'will add a new promotion',
		})
	})
	.put((req, res) => {
		res.json({
			message: 'not supported',
		})
	})
	.delete((req, res) => {
		res.json({
			message: 'will delete all the promotions',
		})
	})
router
	.route('/:promotionId')
	.get((req, res) => {
		res.json({
			message: 'will send promotion with specific id',
		})
	})
	.post((req, res) => {
		res.json({
			message: 'not supported',
		})
	})
	.put((req, res) => {
		res.json({
			message: 'will update promotion with specific id',
		})
	})
	.delete((req, res) => {
		res.json({
			message: 'will delete promotion with specific id',
		})
	})
module.exports = router
