const express = require('express')

const router = express.Router()

router
	.route('/')
	.get((req, res) => {
		res.json({
			message: 'will send all the leaders',
		})
	})
	.post((req, res) => {
		res.json({
			message: 'will add a new leader',
		})
	})
	.put((req, res) => {
		res.json({
			message: 'not supported',
		})
	})
	.delete((req, res) => {
		res.json({
			message: 'will delete all the leaders',
		})
	})
router
	.route('/:leaderId')
	.get((req, res) => {
		res.json({
			message: 'will send leader with specific id',
		})
	})
	.post((req, res) => {
		res.json({
			message: 'not supported',
		})
	})
	.put((req, res) => {
		res.json({
			message: 'will update leader with specific id',
		})
	})
	.delete((req, res) => {
		res.json({
			message: 'will delete leader with specific id',
		})
	})
module.exports = router
