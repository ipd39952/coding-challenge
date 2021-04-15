'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room }) {
      // define association here
      this.belongsTo(Room, { foreignKey: 'roomId', as: 'room' })
    }
    toJSON() {
      return {
        ...this.get(),
        roomId: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      }
    }
  }
  Seat.init(
    {
      roomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'seats',
      modelName: 'Seat',
    }
  )
  return Seat
}
