const express = require('express')
const router = express.Router()
const { getSeat, getSeats } = require('../controllers/seat')

router.get('/', getSeats)
router.get('/:id', getSeat)

module.exports = router
