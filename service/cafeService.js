const { cafe, menu, honeyTip, category } = require('../models');

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
  readCafeInfo: async (cafeId) => {
    try {
      /** 카페 옵션까지 조회 완료 */
      const result = await cafe.findAll({
        include: [
          {
            model : honeyTip,
            as: 'hasCafe',
            attributes : ['id', 'option'],
            through: { attributes: []} 
          }
        ]
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  readCafeMenu: async (cafeId) => {
    try {
      const result = await menu.findAll({
        where: {
          cafeId: cafeId,
        },
        attributes: { exclude: ['cafeId'] },
        include: [
          {
            model : category,
            as: 'hasMenu',
            attributes : ['categoryId'],
            through: { attributes: ['updatedAt']}
          }
        ]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
} 