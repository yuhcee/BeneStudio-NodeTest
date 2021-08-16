const model = require('../db/models');
const Op = require('sequelize').Op;
const moment = require('moment');

class TradeService {
  static async post(payload) {
    try {
      const findTrade = await model.Trade.findOne({
        where: {
          id: payload.id,
        },
      });
      if (findTrade)
        return {
          error: {
            message: 'Duplicate Trade Id.',
          },
        };
      const createTrade = await model.Trade.create(payload);
      const { id, type, symbol, shares, price, timestamp, user } =
        createTrade.dataValues;
      return {
        service: {
          id,
          type,
          user,
          symbol,
          shares,
          price,
          timestamp,
        },
      };
    } catch (error) {
      return { error };
    }
  }

  static async getAllTrades() {
    try {
      const retrieveAll = await model.Trade.findAll({
        order: [['id', 'ASC']],
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      });
      return { service: retrieveAll };
    } catch (error) {
      return { error };
    }
  }

  static async deleteAllTrades() {
    try {
      const deleteAll = await model.Trade.destroy({
        where: {},
        truncate: true,
      });
      return { service: deleteAll };
    } catch (error) {
      return { error };
    }
  }

  static async filterTradesByUserId(userId) {
    try {
      const findUserTrades = await model.Trade.findAll({
        where: {
          user: {
            id: {
              [Op.like]: userId,
            },
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      if (!findUserTrades.length)
        return {
          error: {
            message: 'UserId not found.',
            status: 404,
          },
        };
      return { service: findUserTrades };
    } catch (error) {
      throw Error(error);
    }
  }

  static async filterTradesByStockSymbol({ stockSymbol, type, end, start }) {
    try {
      let useDate = {};
      if (start && end) {
        useDate = {
          ...useDate,
          timestamp: {
            [Op.between]: [
              moment(start).toDate(),
              moment(end).add(1, 'day').toDate(),
            ],
          },
        };
      }
      if (type) {
        useDate = { ...useDate, type };
      }

      const findSymbol = await model.Trade.findOne({
        where: {
          symbol: stockSymbol,
        },
      });
      if (!findSymbol)
        return {
          error: {
            message: 'No symbol',
            status: 404,
          },
        };
      const findAllTrades = await model.Trade.findAll({
        where: {
          symbol: stockSymbol,
          ...useDate,
        },
        order: [['id', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      if (!findAllTrades.length)
        return {
          error: {
            message: 'No such Stock',
            status: 200,
          },
        };
      return { service: findAllTrades };
    } catch (error) {
      return { error };
    }
  }

  static async filterPricesByStockSymbol({ stockSymbol, end, start }) {
    try {
      let useDate = {};
      if (start && end) {
        useDate = {
          ...useDate,
          timestamp: {
            [Op.between]: [
              moment(start).toDate(),
              moment(end).add(1, 'day').toDate(),
            ],
          },
        };
      }

      const findSymbol = await model.Trade.findOne({
        where: {
          symbol: stockSymbol,
        },
      });
      if (!findSymbol)
        return {
          error: {
            status: 404,
          },
        };

      const highest = await model.Trade.max('price', {
        where: {
          symbol: stockSymbol,
          ...useDate,
        },
      });

      const lowest = await model.Trade.min('price', {
        where: {
          symbol: stockSymbol,
          ...useDate,
        },
      });

      if (highest === 0 && lowest === 0) {
        return {
          error: {
            message: 'There are no trades in the given date range',
            status: 200,
          },
        };
      }
      return { service: { symbol: stockSymbol, highest, lowest } };
    } catch (error) {
      return { error };
    }
  }
}
module.exports = TradeService;
