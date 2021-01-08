const { cafe, deleteManage, editManage, addManage } = require('../models');
const user = require('../models/user');

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
  }
}