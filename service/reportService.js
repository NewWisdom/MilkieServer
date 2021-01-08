const { cafe, deleteManage, editManage, addManage, cafeHoneyTip, menuCategory, menu} = require('../models');

module.exports = {
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
      });
      return reports;
    } catch (error) {
      throw error;
    }
  },
  readReportUser: async (userId, cafeId) => {
    try {
      const isRightReportUser = addManage.findOne({
        where: {
          userId: userId,
          cafeId: cafeId
        }
      });
      return isRightReportUser;
    } catch (error) {
      throw error;
    }
  },
  registerCafe: async (cafeName, cafeAddress, cafeMapX, cafeMapY) => {
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
  registerAddCafeHoneyTip: async (cafeId, honeyTipId) => {
    try {
      const result = cafeHoneyTip.create({
        cafeId,
        honeyTipId
      });
      return result;
    } catch (error) {
      throw error;
    }
  }, 
  registerAddCafeMenu: async (cafeId, menuName, price) => {
    try {
      const result = menu.create({
        menuName,
        price,
        cafeId
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  registerAddMenuCategory: async (menuId, categoryId) => {
    try {
      const result = menuCategory.create({
        menuId,
        categoryId
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  registerAddCafe: async (userId, cafeId) => {
    try {
      const progressStatus = 2;
      const now = new Date();
      const result = addManage.create({
        // created_at: Sequelize.NOW,
        userId,
        cafeId,
        confirmStatus: progressStatus,
        created_at: now.toUTCString()
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}