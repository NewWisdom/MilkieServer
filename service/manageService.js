const { cafe, deleteManage, editManage } = require('../models');

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
  readOneDeleteRequest: async (userId) => {
    try {
      const result = deleteManage.findOne({
        userId: userId
      });
      return result;
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
  },
  readOneEditRequest: async (userId) => {
    try {
      const result = editManage.findOne({
        userId
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  registerEditRequest: async (reason, userId, cafeId) => {
    try {
      const result = editManage.create({
        reason,
        cafeId,
        userId
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
}