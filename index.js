require('dotenv').config
const express = require('express')
const app = express()
const { sequelize } = require('./models')

app.use(express.json()) // => req.body

const rooms = require('./routes/room')
const seats = require('./routes/seat')
const bookings = require('./routes/booking')

app.use('/rest/rooms', rooms)
app.use('/rest/seats', seats)
app.use('/rest/bookings', bookings)

app.listen(3000, async () => {
  console.log('Server is listening on port 3000')
  await sequelize.authenticate()
  console.log('Database authenticated!')
})
