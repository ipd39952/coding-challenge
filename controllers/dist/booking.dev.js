"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../models'),
    User = _require.User,
    Seat = _require.Seat,
    Booking = _require.Booking;

var _require2 = require('sequelize'),
    Op = _require2.Op;

var getBookings = function getBookings(req, res) {
  var allBookings;
  return regeneratorRuntime.async(function getBookings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Booking.findAll({
            where: {
              date: _defineProperty({}, Op.gt, new Date(new Date() - 14 * 24 * 60 * 60 * 1000))
            },
            include: [{
              model: Seat,
              as: 'seat',
              include: 'room'
            }, {
              model: User,
              as: 'user'
            }]
          }));

        case 3:
          allBookings = _context.sent;
          res.json(allBookings);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Something went wrong'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var createBooking = function createBooking(req, res) {
  var name, userToken, seatId, date, user, seat, conflictBooking, booking;
  return regeneratorRuntime.async(function createBooking$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Acess username and token from headers
          name = req.get('username');
          userToken = req.get('token');
          seatId = req.body.seatId;
          date = req.body.date;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              name: name
            }
          }));

        case 7:
          user = _context2.sent;

          if (!(!user || user.dataValues.token != userToken)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Authentication error'
          }));

        case 10:
          if (Date.parse(date)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid date format'
          }));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(Seat.findOne({
            where: {
              id: seatId
            }
          }));

        case 14:
          seat = _context2.sent;

          if (seat) {
            _context2.next = 17;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: [{
              msg: 'Invalid value',
              param: 'seatId',
              location: 'body'
            }]
          }));

        case 17:
          _context2.next = 19;
          return regeneratorRuntime.awrap(Booking.findOne({
            where: {
              date: date,
              seatId: seatId
            }
          }));

        case 19:
          conflictBooking = _context2.sent;

          if (!conflictBooking) {
            _context2.next = 22;
            break;
          }

          return _context2.abrupt("return", res.status(500).json({
            error: 'Already booked for specified time'
          }));

        case 22:
          if (!(new Date(date).getDate() - new Date().getDate() > 7)) {
            _context2.next = 24;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Booking can't be placed for more than 7 days in the future"
          }));

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(Booking.create({
            userId: user.dataValues.id,
            seatId: seatId,
            date: date
          }));

        case 26:
          booking = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            message: 'success',
            booking: booking
          }));

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          res.status(500).json({
            error: 'A database error occurred'
          });

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 30]]);
};

var getBooking = function getBooking(req, res) {
  var id, booking;
  return regeneratorRuntime.async(function getBooking$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Booking.findOne({
            where: {
              id: id
            },
            include: [{
              model: Seat,
              as: 'seat',
              include: 'room'
            }, {
              model: User,
              as: 'user'
            }]
          }));

        case 4:
          booking = _context3.sent;

          if (booking) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(500).json({
            message: 'No booking with such ID found'
          }));

        case 7:
          res.status(200).json(booking);
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Something went wrong'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

var deleteBooking = function deleteBooking(req, res) {
  var name, userToken, bookingId, user, booking;
  return regeneratorRuntime.async(function deleteBooking$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          name = req.get('username');
          userToken = req.get('token');
          bookingId = req.params.id;
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              name: name
            }
          }));

        case 6:
          user = _context4.sent;

          if (!(!user || user.dataValues.token != userToken)) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'A database error occurred'
          }));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(Booking.findOne({
            where: {
              date: _defineProperty({}, Op.gt, new Date(new Date() - 14 * 24 * 60 * 60 * 1000)),
              userId: user.id,
              id: bookingId
            }
          }));

        case 11:
          booking = _context4.sent;

          if (booking) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Booking not found'
          }));

        case 16:
          booking.destroy();
          return _context4.abrupt("return", res.status(200).json({
            message: 'sucess'
          }));

        case 18:
          _context4.next = 24;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](3);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            error: 'Internal Server error'
          }));

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 20]]);
};

module.exports = {
  getBookings: getBookings,
  getBooking: getBooking,
  createBooking: createBooking,
  deleteBooking: deleteBooking
};