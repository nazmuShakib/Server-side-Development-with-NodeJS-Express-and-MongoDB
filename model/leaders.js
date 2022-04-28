const mongoose = require('mongoose')

const { Schema } = mongoose

const leaderSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		designation: {
			type: String,
			required: true,
		},
		abbr: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Leader', leaderSchema)
