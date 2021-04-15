'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Seat, User }) {
      // define association here
      this.belongsTo(Seat, { foreignKey: 'seatId', as: 'seat' }),
        this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
    toJSON() {
      return {
        ...this.get(),
        userId: undefined,
        seatId: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      }
    }
  }
  Booking.init(
    {
      seatId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'bookings',
      modelName: 'Booking',
    }
  )
  return Booking
}
