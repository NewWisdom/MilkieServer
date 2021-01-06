const { cafe, deleteManage, editManage, addManage } = require('../models');

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
  readOneDeleteCafe: async (userId) => {
    try {
      const result = deleteManage.findOne({
        userId: userId
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  registerDeleteCafe: async (reason, userId, cafeId) => {
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
  readOneEditCafe: async (userId) => {
    try {
      const result = editManage.findOne({
        userId
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  registerEditCafe: async (reason, userId, cafeId) => {
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
  readAllReports: async (userId) => {
    try {
      const reports = addManage.findAll({
        where : {
          userId: userId
        }
      })
    } catch (error) {
      throw error;
    }
  }
}