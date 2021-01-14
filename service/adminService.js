const { user, addManage, sequelize } = require('../models');

module.exports = {
  isAdmin: async (userId) => {
    try {
      const result = user.findOne({
        where: {
          id: userId,
          isAdmin: true
        },
        raw: true
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  isAlreadyCancel: async (cafeId) => {
    try {
      const cancel = 1;
      const result = addManage.findOne({
        where: {
          cafeId: cafeId,
          confirmStatus: cancel
        },
        raw: true
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  cancelReport: async (cafeId, rejectReasonId) => {
    try {
      const cancel = 1;
      const result = addManage.update({
        confirmStatus: cancel,
        rejectReasonId: rejectReasonId
      },{
        where: {
          cafeId: cafeId,
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}