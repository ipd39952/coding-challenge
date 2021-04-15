"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/booking'),
    getBookings = _require.getBookings,
    getBooking = _require.getBooking,
    createBooking = _require.createBooking,
    deleteBooking = _require.deleteBooking;

router.get('/', getBookings);
router.post('/', createBooking);
router.get('/:id', getBooking);
router["delete"]('/:id', deleteBooking);
module.exports = router;