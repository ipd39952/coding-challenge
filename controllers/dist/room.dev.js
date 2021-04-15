"use strict";

var _require = require('../models'),
    Room = _require.Room;

var getRooms = function getRooms(req, res) {
  var allRooms;
  return regeneratorRuntime.async(function getRooms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Room.findAll());

        case 3:
          allRooms = _context.sent;
          res.json(allRooms);
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

var getRoom = function getRoom(req, res) {
  var id, room;
  return regeneratorRuntime.async(function getRoom$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Room.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          room = _context2.sent;

          if (room) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(500).json({
            message: 'No room with such ID found'
          }));

        case 7:
          res.status(200).json(room);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Something went wrong'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  getRoom: getRoom,
  getRooms: getRooms
};