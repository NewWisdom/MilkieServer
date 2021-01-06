const { universe, cafe, honeyTip, category } = require('../models');

module.exports = {
  readUniverseCount: async (cafeId) => {
    try {
      const universeCount = universe.findAndCountAll({
        where: {
          cafeId: cafeId
        }
      });
      return universeCount;
    } catch (error) {
      throw error;
    }
  }
} 