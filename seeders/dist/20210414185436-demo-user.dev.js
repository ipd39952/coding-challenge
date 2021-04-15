'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var date;
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
            date = new Date();
            _context.next = 3;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('users', [{
              name: 'Malte',
              token: 'wakndi492jn290n8398',
              profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGeBLCrFpaFEASeRNPTXvsFIGaJta2wEA1PzB61QzoYhsfWwDi1gTIvpVb0JSH4FAYBc&usqp=CAU',
              createdAt: date,
              updatedAt: date
            }], {}));

          case 3:
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
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};