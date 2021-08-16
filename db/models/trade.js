'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trade.init({
    type: DataTypes.ENUM("buy", "sell"),
    symbol: DataTypes.STRING,
    shares: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    timestamp: DataTypes.STRING,
    user: DataTypes.JSONB
  }, {
      sequelize,
      modelName: 'Trade',
    });
  return Trade;
};