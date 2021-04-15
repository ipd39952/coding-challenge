'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        updatedAt: undefined,
        createdAt: undefined,
        token: undefined,
      }
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      profilePicture: DataTypes.TEXT,
      token: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )
  return User
}
