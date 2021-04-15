'use strict';

var _require = require('../models'),
    Room = _require.Room;

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var data, amount, rooms, room, date;
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
             */
            data = [];
            amount = 10;
            _context.next = 4;
            return regeneratorRuntime.awrap(Room.findAll());

          case 4:
            rooms = _context.sent;
            room = null;
            date = new Date();

            while (amount--) {
              room = rooms[Math.floor(Math.random() * rooms.length)];
              data.push({
                roomId: room.dataValues.id,
                createdAt: date,
                updatedAt: date
              });
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('seats', data, {}));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('seats', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};