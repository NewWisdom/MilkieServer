const statusCode = require("../modules/statusCode");
const responseMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const { user, cafe, universe, menuCategory, menu, sequelize } = require('../models/index');
const jwt = require('../modules/jwt');
const { universeService } = require('../service');

module.exports = {
  milkyHome: async (req, res) => {
    const userIdx = req.userIdx;

    try {
      const result = await sequelize.query(`SELECT CAFE.id, CAFE.cafeName, ifnull(universeCount, 0) universeCount, CAFE.cafeMapX, CAFE.cafeMapY, CAFE.cafeAddress, CAFE.businessHours,
      ifnull(isUniversed, false) as isUniversed
              FROM CAFE LEFT JOIN (
                  SELECT distinct UNIVERSE.cafeId, count(UNIVERSE.cafeId) universeCount, true as isUniversed
                  FROM UNIVERSE
                  WHERE userId = ${userIdx}
              ) as cu ON CAFE.id = cu.cafeId;`);

      for (let i = 0; i < result[0].length; i++) {
        if (result[0][i].isUniversed == 1) {
          result[0][i].isUniversed = true
        } else {
          result[0][i].isUniversed = false
        }
      }
      const userNickName = await user.findAll({
        attributes: ['nickName'],
        where: {
          id: userIdx
        }
      });

      const { nickName } = userNickName[0];

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_HOME_SUCCESS, {
        result,
        nickName
      }));
      return;
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      return;
    }
  },
  categoryHome: async (req, res) => {
    const userIdx = req.userIdx;
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    } 

    try {
      const findCategoryResult = await menuCategory.findAll({
        attributes: ['menuId'],
        where: {
          categoryId: categoryId
        },
        raw: true
      });

      if (!findCategoryResult) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      var findCategoryArray = [];
      for (var i = 0; i < findCategoryResult.length; i++) {
        findCategoryArray.push(findCategoryResult[i].menuId)
      }

      const findCategory = findCategoryArray;

      const findMenuResult = await menu.findAll({
        attributes: ['cafeId'],
        where: {
          menuId : findCategory
        },
        raw: true
      });

      if (!findMenuResult) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      var findMenuArray = [];
      for (var i = 0; i < findMenuResult.length; i++) {
        findMenuArray.push(findMenuResult[i].cafeId)
      }

      const findMenu = findMenuArray;

      const categoryCafe = await cafe.findAll({
        attributes: ['id', 'cafeName', 'cafeAddress', 'businessHours', 'cafeMapX', 'cafeMapY', 'isReal'],
        where: {
          id : findMenu,
          isReal: true
        }
      });

      const userNickName = await user.findAll({
        attributes: ['nickName'],
        where: {
          id: userIdx
        }
      });

      const { nickName } = userNickName[0];

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_HOME_SUCCESS, {
        categoryCafe,
        nickName
      }));
      return;
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      return;
    }
  }
}