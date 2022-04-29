const mongoose = require('mongoose')

const { Schema } = mongoose

const commentSchema = new Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)
module.exports = commentSchema
