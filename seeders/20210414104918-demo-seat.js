'use strict'
const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    let data = []
    let amount = 10
    const rooms = await models.Room.findAll()
    let room = null
    const date = new Date()
    while (amount--) {
      room = rooms[Math.floor(Math.random() * rooms.length)]
      data.push({
        roomId: room.dataValues.id,
        createdAt: date,
        updatedAt: date,
      })
    }
    await queryInterface.bulkInsert('seats', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('seats', null, {})
  },
}
