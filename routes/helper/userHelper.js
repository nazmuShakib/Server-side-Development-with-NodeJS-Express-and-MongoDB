const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../model/users')

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({}, { __v: 0, _id: 0 })
		res.json(users)
	} catch (err) {
		next(err)
	}
}
const signUp = async (req, res, next) => {
	try {
		const { name, email, password, admin } = req.body
		const hashedPassword = await bcrypt.hash(password, 13)
		const user = new User({
			name,
			email,
			password: hashedPassword,
			admin,
		})
		await user.save()
		res.json({
			message: 'SignUp successful.',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.find({ email })
		if (user) {
			const { name, admin, _id } = user[0]
			const valid = await bcrypt.compare(password, user[0].password)
			if (valid) {
				const token = jwt.sign(
					{
						name,
						email,
						admin,
						userID: _id,
					},
					process.env.ACCESS_TOKEN,
					{
						expiresIn: '1h',
					}
				)
				res.json({
					message: 'Login Successful.',
					access_token: token,
				})
			} else {
				next(new Error('Authentication failed.'))
			}
		} else {
			next(new Error('Authentication failed.'))
		}
	} catch (err) {
		next(new Error('Authentication failed.'))
	}
}
module.exports = {
	getAllUsers,
	signUp,
	login,
}
