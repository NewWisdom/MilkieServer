const { cafe, cafeHoneyTip, honeyTip, addManage } = require('../models');

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
  readCafeHoneyTip: async (cafeId) => {
    try {
      /** 카페 옵션까지 조회 완료 */
      const result = await cafe.findAll({
        include: [
          {
            model : honeyTip,
            as: 'hasCafe',
            attributes : ['id'],
            through: {attributes: []}
          }
        ]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
} 