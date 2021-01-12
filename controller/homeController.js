const statusCode = require("../modules/statusCode");
const responseMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const { user, cafe, universe, menuCategory, menu, sequelize } = require('../models/index');
const jwt = require('../modules/jwt');

module.exports = {
  milkyHome: async (req, res) => {
    const userIdx = req.userIdx;

    try {
      const tempResult = await sequelize.query(`SELECT CAFE.id, CAFE.cafeName, ifnull(universeCount, 0) universeCount, CAFE.longitude, CAFE.latitude, CAFE.cafeAddress, CAFE.businessHours,
      ifnull(isUniversed, false) as isUniversed
              FROM CAFE LEFT JOIN (
                  SELECT distinct UNIVERSE.cafeId, count(UNIVERSE.cafeId) universeCount, true as isUniversed
                  FROM UNIVERSE
                  WHERE userId = ${userIdx}
              ) as cu ON CAFE.id = cu.cafeId
              where CAFE.isReal = true;`);

      const result = tempResult[0];

      for (let i = 0; i < result.length; i++) {
        if (result[i].isUniversed == 1) {
          result[i].isUniversed = true
        } else {
          result[i].isUniversed = false
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
    const { categoryId } = req.body;

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
      console.log(findMenuArray);

      const tempResult = await sequelize.query(`SELECT CAFE.id, CAFE.cafeName, ifnull(universeCount, 0) universeCount, CAFE.longitude, CAFE.latitude, CAFE.cafeAddress, CAFE.businessHours,
      ifnull(isUniversed, false) as isUniversed
              FROM CAFE LEFT JOIN (
                  SELECT distinct UNIVERSE.cafeId, count(UNIVERSE.cafeId) universeCount, true as isUniversed
                  FROM UNIVERSE
                  WHERE userId = ${userIdx}
              ) as cu ON CAFE.id = cu.cafeId
              where CAFE.id in ${findMenu} and CAFE.isReal = true;`);

      console.log(tempResult);
      const result = tempResult[0];
      console.log(result);

      for (let i = 0; i < result.length; i++) {
        if (result[i].isUniversed == 1) {
          result[i].isUniversed = true
        } else {
          result[i].isUniversed = false
        }
      }

      // const temp = await sequelize.query(`SELECT MENU.menuId
      //         FROM MENU LEFT JOIN (
      //             SELECT distinct MENU_CATEGORY.menuId
      //             FROM MENU_CATEGORY
      //             WHERE categoryId = ${categoryId}
      //         ) as mu ON MENU.menuId = mu.menuId`);

      // const category = temp[0];
      // for (let i = 0; i < category.length; i++) {
      //   temp.push(temp[i].menuId)
      // }
      // console.log(category);
      // FROM CAFE LEFT JOIN (
      //   SELECT CAFE.id
      //   FROM MENU
      //   WHERE userId = ${userIdx}
      // ) as mu On CAFE.id = mu.cafeId
      // where CAFE.id = ${[findMenu]};

      // console.log(tempResult);
      // for (let i = 0; i < categoryCafe.length; i++) {
      //   if (categoryCafe[i].id == 0) {
      //     categoryCafe = []
      //   } else {
      //     categoryCafe
      //   }
      // }

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
  }
}