const TradeService = require('../service/trade');

class TradeController {
  static async addTrade(request, response) {
    try {
      const { service, error } = await TradeService.post(request.body);
      if (error && error.message) {
        return response.status(400).json({
          message: error.message,
        });
      }
      if (service) {
        const { id, type, user, symbol, shares, price, timestamp } = service;
        return response.status(201).json({
          id,
          type,
          user,
          symbol,
          shares,
          price,
          timestamp,
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  static async getAllTrades(req, res) {
    try {
      const { service, error } = await TradeService.getAllTrades();
      if (error) {
        throw Error(error);
      }
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteAllTrades(request, response) {
    try {
      const { service, error } = await TradeService.deleteAllTrades();
      if (error) {
        throw Error(error);
      }
      return response.status(200).json({
        data: service,
        message: 'Deleted trades successfully',
        status_code: 200,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  static async filterTradesByUserId(req, res) {
    try {
      const { userId } = req.params;
      const { service, error } = await TradeService.filterTradesByUserId(
        userId
      );
      if (error && error.status) {
        return res.status(error.status).json({});
      }
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  static async filterTradesByStockSymbol(req, res) {
    try {
      const { stockSymbol } = req.params;
      const { type, start, end } = req.query;
      const { service, error } = await TradeService.filterTradesByStockSymbol({
        stockSymbol,
        type,
        start,
        end,
      });

      if (error && error.status) {
        const statusType = error.message === 'No symbol' ? {} : []
        return res.status(error.status).json(statusType);
      }
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  static async filterPriceByStockSymbol(req, res) {
    try {
      const { stockSymbol } = req.params;
      const { start, end } = req.query;
      const { service, error } = await TradeService.filterPricesByStockSymbol({
        stockSymbol,
        start,
        end,
      });

      if (error && error.status) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
      return res.status(200).json({service });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

module.exports = TradeController;
