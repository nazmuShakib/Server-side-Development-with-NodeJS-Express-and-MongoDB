const Leader = require('../../model/leaders')

const getAllLeaders = async (req, res, next) => {
	try {
		const leaders = await Leader.find(
			{},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		)
		res.json(leaders)
		next()
	} catch (err) {
		next(err)
	}
}
const addLeader = async (req, res, next) => {
	try {
		await Leader.create(req.body)
		res.json({
			message: 'New leader added',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const getLeaderById = async (req, res, next) => {
	try {
		const leader = await Leader.findById(req.params.leaderId, {
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
		res.json(leader)
		next()
	} catch (err) {
		next(err)
	}
}
const updateLeader = async (req, res, next) => {
	try {
		if (
			await Leader.findByIdAndUpdate(
				req.params.leaderId,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
		)
			res.json({
				message: 'Updated leader.',
			})
		else next(new Error('Invalid ID.'))
		next()
	} catch (err) {
		next(err)
	}
}
const deleteAllLeaders = async (req, res, next) => {
	try {
		await Leader.deleteMany({})
		res.json({
			message: 'Deleted all leaders.',
		})
		next()
	} catch (err) {
		next(err)
	}
}
const deleteLeader = async (req, res, next) => {
	try {
		if (await Leader.findByIdAndDelete(req.params.leaderId))
			res.json({
				message: 'Deleted leader.',
			})
		else next(new Error('Invalid ID.'))
		next()
	} catch (err) {
		next(err)
	}
}
const getComment = async (req, res, next) => {
	try {
		const leaders = await Leader.findById(req.params.leaderId, {
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
			.populate('comments.author', '-_id -__v -password -admin')
			.exec()
		if (leaders) {
			res.json(leaders.comments)
			next()
		} else {
			const err = new Error('Leader not found.')
			err.status = 404
			next(err)
		}
		next()
	} catch (err) {
		next(err)
	}
}
const postComment = async (req, res, next) => {
	try {
		const leader = await Leader.findById(req.params.leaderId)
		if (leader) {
			req.body.author = req.user.userID
			await leader.comments.push(req.body)
			await leader.save()
			res.json({
				message: 'New comment posted.',
			})
			next()
		} else {
			const err = new Error('Leader not found')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
const updateComment = async (req, res, next) => {
	try {
		const leader = await Leader.findById(req.params.leaderId).populate('comments.author')
		const id1 = leader.comments.id(req.params.commentId).author.id
		const id2 = req.user.userID
		if (id1 === id2) {
			if (leader && leader.comments.id(req.params.commentId) && req.body) {
				if (req.body.rating)
					leader.comments.id(req.params.commentId).rating = req.body.rating
				if (req.body.comment)
					leader.comments.id(req.params.commentId).comment = req.body.comment
				await leader.save()
				res.json({
					message: 'Updated comment.',
				})
			} else {
				next(new Error('No leaders'))
			}
			next()
		} else {
			const err = new Error('Leader not found.')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
const deleteComment = async (req, res, next) => {
	try {
		const leader = await Leader.findById(req.params.leaderId).populate('comments.author')
		const id1 = leader.comments.id(req.params.commentId).author.id
		const id2 = req.user.userID
		if (id1 === id2) {
			if (leader && leader.comments.id(req.params.commentId)) {
				leader.comments.id(req.params.commentId).remove()
				leader.save()
				res.json({
					message: 'Deleted comment.',
				})
			} else {
				next(new Error('No leaders'))
			}
			next()
		} else {
			const err = new Error('Leader not found.')
			err.status = 404
			next(err)
		}
	} catch (err) {
		next(err)
	}
}
module.exports = {
	getAllLeaders,
	addLeader,
	deleteAllLeaders,
	getLeaderById,
	updateLeader,
	deleteLeader,
	getComment,
	postComment,
	updateComment,
	deleteComment,
}
