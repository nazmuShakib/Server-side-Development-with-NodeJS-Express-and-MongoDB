const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)

const { Currency } = mongoose.Types
const { Schema } = mongoose

const dishSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Currency,
			required: true,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Dish', dishSchema)
