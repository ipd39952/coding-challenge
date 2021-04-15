const { Seat } = require('../models')

const getSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll({ include: 'room' })
    res.status(200).json(seats)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const getSeat = async (req, res) => {
  const id = req.params.id
  try {
    const seat = await Seat.findOne({ where: { id }, include: 'room' })
    if (!seat) {
      return res.status(500).json({ message: 'No seat found with such ID' })
    }
    res.status(200).json(seat)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports = { getSeat, getSeats }
