const { cafe, deleteManage } = require('../models');
module.exports = {
  readOneCafe: async (cafeId) => {
    try {
      const existingCafe = await cafe.findOne({
        where: {
          id: cafeId,
        }
      });
      return existingCafe;
    } catch (error) {
      throw error;
    }
  },
  registerDeleteRequest: async (reason, userId, cafeId) => {
    try {
      const result = deleteManage.create({
        reason,
        cafeId,
        userId
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}