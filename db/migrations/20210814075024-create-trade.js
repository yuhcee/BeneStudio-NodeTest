'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM('BUY', 'SELL'),
      },
      symbol: {
        type: Sequelize.STRING,
      },
      shares: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      timestamp: {
        type: Sequelize.STRING,
      },
      user: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trades');
  },
};
