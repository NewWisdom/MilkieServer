const statusCode = require("../modules/statusCode");
const responseMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const { user, cafe, category  } = require('../models/index');
const jwt = require('../modules/jwt');
const sequelize = require('sequelize');

module.exports = {
  milkyHome: async (req, res) => {
    const userIdx = req.userIdx;

    try {
      const aroundCafe = await cafe.findAll({
        attributes: ['id', 'cafeName', 'cafeAddress', 'businessHours', 'cafeMapX', 'cafeMapY', 'isReal']
      });

      const universeResult = await universe.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('universeId')), 'universeCount']],
        where: {
          userId: userIdx
        } 
      });
  
      const { universeCount } = universeResult[0].dataValues;

      const isUniverse = await universe.findAll({
        attributes: ['cafeId'],
        where: {
          userId: userIdx
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
        aroundCafe,
        universeCount,
        isUniverse,
        nickName
      }));
      return;
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      return;
    }
  }
}