const { cafe, deleteManage, editManage, addManage, cafeHoneyTip } = require('../models');

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
  },
  registerAddCafe: async (cafeName, cafeAddress, cafeMapX, cafeMapY) => {
    try {
      const privateCafeType = 1;
      const notReal = 0;
      const registerCafeId = cafe.create({
          cafeName,
          cafeAddress,
          cafeMapX,
          cafeMapY,
          cafeType: privateCafeType,
          isReal: notReal
      });
      return registerCafeId;
    } catch (error) {
      throw error;
    }
  },
  registerAddCafeHoneyTip: async (cafeId, honeyTip) => {
    try {
      const result = cafeHoneyTip.create({
        cafeId: cafeId,
        honeyTipId: honeyTip
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}