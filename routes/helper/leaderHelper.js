const Leader = require('../../model/leaders')

const getAllLeaders = async (req, res, next) => {
	try {
		const leaders = await Leader.find(
			{},
			{
				_id: 0,
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
			_id: 0,
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
module.exports = {
	getAllLeaders,
	addLeader,
	deleteAllLeaders,
	getLeaderById,
	updateLeader,
	deleteLeader,
}
