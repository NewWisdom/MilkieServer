const statusCode = require("../modules/statusCode");
const responseMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const { user, universe } = require('../models/index');
const jwt = require('../modules/jwt');
const sequelize = require('sequelize');

module.exports = {
  universeOn: async (req, res) => {
    const userIdx = req.userIdx;
    const { universeId, cafeId } = req.params;

    try {
      if (!userIdx || !universeId || !cafeId) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
      }
  
      await universe.create({
        universeId: universeId,
        userId: userIdx,
        cafeId: cafeId,
      });
  
      const universeResult = await universe.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('universeId')), 'universeCount']],
        where: {
          userId: userIdx
        } 
      });
  
      const { universeCount } = universeResult[0].dataValues;
  
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UNIVERSEON_SUCCESS, {
        universeCount
      }));
      return;
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      return;
    }
  },
  universeOff: async (req, res) => {
    const userIdx = req.userIdx;
    const { universeId, cafeId } = req.params;

    try {
      if (!userIdx || !universeId || !cafeId) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
      }
  
      const universeCount = await universe.findOne({
        where: {
          universeId: universeId,
          userId: userIdx,
          cafeId: cafeId,
        }
      });
  
      if (!universeCount) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_FOUND_UNIVERSE));
      }
  
      await universeCount.destroy({
        where: {
          universeId: universeId,
          userId: userIdx,
          cafeId: cafeId,
        }
      });
  
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_UNIVERSE_SUCCESS, {
        universeCount
      }));
      return;
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      return;
    }
  }
}