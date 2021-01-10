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
  },
  isUniversed: async (userId, cafeId) => {
    try {
      const result = universe.findAll({
        where: {
          cafeId: cafeId,
          userId: userId
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
} 