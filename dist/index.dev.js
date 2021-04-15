"use strict";

require('dotenv').config;

var express = require('express');

var app = express();

var _require = require('./models'),
    sequelize = _require.sequelize;

app.use(express.json()); // => req.body

var rooms = require('./routes/room');

var seats = require('./routes/seat');

var bookings = require('./routes/booking');

app.use('/rest/rooms', rooms);
app.use('/rest/seats', seats);
app.use('/rest/bookings', bookings);
app.listen(3000, function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Server is listening on port 3000');
          _context.next = 3;
          return regeneratorRuntime.awrap(sequelize.authenticate());

        case 3:
          console.log('Database authenticated!');

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});