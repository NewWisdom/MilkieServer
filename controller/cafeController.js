const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { cafeService, universeService } = require('../service');
const honeyTip = require('../models/honeyTip');
// const cafe = require('../models/cafe');

module.exports = {
  readOneCafeInfo: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId } = req.params;

    if (!userId || !cafeId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      var cafeInfo = await cafeService.readCafeInfo(cafeId);
      if (!cafeInfo) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE_INFO));
      }
      cafeInfo[0]['honeyTip'] = cafeInfo[0]['hasCafe.id'];
      delete cafeInfo[0]['hasCafe.id'];

      const menu = await cafeService.readCafeMenu(cafeId);
      if (!menu) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE_MENU));
      }
      menu[0]['category'] = menu[0]['hasMenu.categoryId'];
      delete menu[0]['hasMenu.categoryId'];

      const universe = await universeService.readUniverseCount(cafeId);
      if (!universe) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_UNIVERSE));
      }
      const universeCount = universe.count

      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_CAFE_INFO_SUCCESS, {cafeInfo, menu, universeCount}));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
}