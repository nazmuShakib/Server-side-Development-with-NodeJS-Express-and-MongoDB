require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use('/dishes', require('./routes/dish'))
app.use('/promotions', require('./routes/promotion'))
app.use('/leaders', require('./routes/leader'))

app.listen(process.env.PORT, () => {
	console.log(`Server running on PORT ${process.env.PORT}`)
})
