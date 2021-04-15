'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Seat }) {
      // define association here
      this.hasMany(Seat, { foreignKey: 'roomId' })
    }
    toJSON() {
      return {
        ...this.get(),
        updatedAt: undefined,
        createdAt: undefined,
      }
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'rooms',
      modelName: 'Room',
    }
  )
  return Room
}
