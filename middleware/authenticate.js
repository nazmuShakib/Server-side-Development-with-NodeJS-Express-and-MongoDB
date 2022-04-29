const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
	try {
		const { authorization } = req.headers
		if (authorization) {
			const token = authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
			if (decoded) {
				const { name, email, admin, userID } = decoded
				req.user = {
					name,
					email,
					admin,
					userID,
				}
				next()
			} else next(new Error('Authentication failed.'))
		} else next(new Error('Authentication failed.'))
	} catch (err) {
		next(err)
	}
}
const verifyAdmin = (req, res, next) => {
	if (req.user.admin) next()
	else next(new Error('Authentication failed.'))
}
module.exports = {
	verifyUser,
	verifyAdmin,
}
