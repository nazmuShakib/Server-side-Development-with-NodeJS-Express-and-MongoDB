const express = require('express')
const {
	getAllLeaders,
	getLeaderById,
	addLeader,
	updateLeader,
	deleteAllLeaders,
	deleteLeader,
} = require('./helper/leaderHelper')

const { verifyAdmin, verifyUser } = require('../middleware/authenticate')

const router = express.Router()

router
	.route('/')
	.get((req, res, next) => {
		getAllLeaders(req, res, next)
	})
	.post(verifyUser, verifyAdmin, (req, res, next) => {
		addLeader(req, res, next)
	})
	.put(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		deleteAllLeaders(req, res, next)
	})
router
	.route('/:leaderId')
	.get((req, res, next) => {
		getLeaderById(req, res, next)
	})
	.post(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.put(verifyUser, verifyAdmin, (req, res, next) => {
		updateLeader(req, res, next)
	})
	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		deleteLeader(req, res, next)
	})
module.exports = router
