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
        where: {
          id: cafeId
        },
        include: [
          {
            model : honeyTip,
            as: 'hasCafe',
            attributes : ['id'],
            through: { attributes: []} 
          }
        ],
        raw: true,
        attributes: {exclude: ['cafeMapX', 'cafeMapY', 'cafeType', 'isReal']}
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
            through: { attributes: []}
          }
        ],
        raw: true
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteCafe: async (cafeId) => {
    const result = await cafe.destroy({
      where: {
        id: cafeId
      }
    })
    return result;
  },
  checkCafeIsNotReal: async (cafeId) => {
    try {
      const result = await cafe.findOne({
        where: {
          id: cafeId,
          isReal: 0
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
} 