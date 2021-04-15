const { User, Seat, Booking } = require('../models')
const { Op } = require('sequelize')

const getBookings = async (req, res) => {
  try {
    // Return only bookings for the last 14 days
    const allBookings = await Booking.findAll({
      where: {
        date: { [Op.gt]: new Date(new Date() - 14 * 24 * 60 * 60 * 1000) },
      },
      include: [
        { model: Seat, as: 'seat', include: 'room' },
        { model: User, as: 'user' },
      ],
    })
    res.json(allBookings)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
const createBooking = async (req, res) => {
  // Acess username and token from headers
  const name = req.get('username')
  const userToken = req.get('token')
  const seatId = req.body.seatId
  const date = req.body.date
  try {
    // Check whether user exists and check token
    const user = await User.findOne({ where: { name } })
    if (!user || user.dataValues.token != userToken) {
      return res.status(400).json({ message: 'Authentication error' })
    }

    // !Date.parse returns true only for invalid dates
    if (!Date.parse(date)) {
      return res.status(400).json({ message: 'Invalid date format' })
    }
    // Check if a valid seat is specified
    const seat = await Seat.findOne({ where: { id: seatId } })
    if (!seat) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid value',
            param: 'seatId',
            location: 'body',
          },
        ],
      })
    }
    // Look for another booking with the same date
    const conflictBooking = await Booking.findOne({ where: { date, seatId } })
    if (conflictBooking) {
      return res
        .status(500)
        .json({ error: 'Already booked for specified time' })
    }
    // Check if date for the booking is more than 7 days in the future
    if (new Date(date).getDate() - new Date().getDate() > 7) {
      return res.status(400).json({
        message: "Booking can't be placed for more than 7 days in the future",
      })
    }
    const booking = await Booking.create({
      userId: user.dataValues.id,
      seatId,
      date,
    })
    return res.status(200).json({ message: 'success', booking })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'A database error occurred' })
  }
}
const getBooking = async (req, res) => {
  const id = req.params.id
  try {
    const booking = await Booking.findOne({
      where: { id },
      include: [
        { model: Seat, as: 'seat', include: 'room' },
        { model: User, as: 'user' },
      ],
    })
    if (!booking) {
      return res.status(500).json({ message: 'No booking with such ID found' })
    }
    res.status(200).json(booking)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const deleteBooking = async (req, res) => {
  const name = req.get('username')
  const userToken = req.get('token')
  const bookingId = req.params.id
  try {
    const user = await User.findOne({ where: { name } })
    if (!user || user.dataValues.token != userToken) {
      return res.status(400).json({
        error: 'A database error occurred',
      })
    }
    const booking = await Booking.findOne({
      where: {
        date: { [Op.gt]: new Date(new Date() - 14 * 24 * 60 * 60 * 1000) },
        userId: user.id,
        id: bookingId,
      },
    })
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    } else {
      booking.destroy()
      return res.status(200).json({ message: 'sucess' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server error' })
  }
}

module.exports = { getBookings, getBooking, createBooking, deleteBooking }
