const express = require('express')
const {
	getAllPromotions,
	addPromotion,
	deleteAllPromotions,
	getPromotionById,
	updatePromotion,
	deletePromotion,
} = require('./helper/promotionHelper')

const { verifyUser, verifyAdmin } = require('../middleware/authenticate')

const router = express.Router()

router
	.route('/')
	.get((req, res, next) => {
		getAllPromotions(req, res, next)
	})
	.post(verifyUser, verifyAdmin, (req, res, next) => {
		addPromotion(req, res, next)
	})
	.put(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		deleteAllPromotions(req, res, next)
	})
router
	.route('/:promotionId')
	.get((req, res, next) => {
		getPromotionById(req, res, next)
	})
	.post(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({
			message: 'not supported',
		})
		next()
	})
	.put(verifyUser, verifyAdmin, (req, res, next) => {
		updatePromotion(req, res, next)
	})
	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		deletePromotion(req, res, next)
	})
module.exports = router
