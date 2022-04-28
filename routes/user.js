const express = require('express')
const { getAllUsers, signUp, login } = require('./helper/userHelper')
const { verifyUser, verifyAdmin } = require('../middleware/authenticate')

const router = express.Router()

router.get('/', verifyUser, verifyAdmin, (req, res, next) => {
	getAllUsers(req, res, next)
})
router.post('/signup', async (req, res, next) => {
	signUp(req, res, next)
})

router.post('/login', async (req, res, next) => {
	login(req, res, next)
})
module.exports = router
