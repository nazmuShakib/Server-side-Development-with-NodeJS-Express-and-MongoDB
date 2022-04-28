require('dotenv').config()
require('./connectDatabase')()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/dishes', require('./routes/dish'))
app.use('/promotions', require('./routes/promotion'))
app.use('/leaders', require('./routes/leader'))

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(process.env.PORT, () => {
		console.log(`Server running on PORT ${process.env.PORT}`)
	})
})
