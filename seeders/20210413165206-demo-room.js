'use strict'
const faker = require('faker')
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
    const date = new Date()
    while (amount--) {
      data.push({
        name: faker.git.commitMessage(),
        createdAt: date,
        updatedAt: date,
      })
    }
    await queryInterface.bulkInsert('rooms', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('rooms', null, {})
  },
}
