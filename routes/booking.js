const express = require('express')
const router = express.Router()
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
} = require('../controllers/booking')

router.get('/', getBookings)
router.post('/', createBooking)
router.get('/:id', getBooking)
router.delete('/:id', deleteBooking)

module.exports = router
