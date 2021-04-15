'use strict'

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
    const date = new Date()
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Malte',
          token: 'wakndi492jn290n8398',
          profilePicture:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGeBLCrFpaFEASeRNPTXvsFIGaJta2wEA1PzB61QzoYhsfWwDi1gTIvpVb0JSH4FAYBc&usqp=CAU',
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
