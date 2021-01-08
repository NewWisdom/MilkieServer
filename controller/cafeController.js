const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { cafeService, universeService } = require('../service');

module.exports = {
  readOneCafeInfo: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId } = req.params;

    if (!userId || !cafeId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      let cafeInfo = await cafeService.readCafeInfo(cafeId);
      if (!cafeInfo) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE_INFO));
      }
      /** 데이커 가공 */
      const honeyTips = []
      for (let i = 0; i < cafeInfo.length; i++) {
        honeyTips.push(cafeInfo[i]['hasCafe.id'])
        delete cafeInfo[i]['hasCafe.id'];
      }
      cafeInfo = cafeInfo[0]
      cafeInfo['honeyTip'] = honeyTips;
    
      let menu = await cafeService.readCafeMenu(cafeId);
      if (!menu) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE_MENU));
      }
      for (let i = 0; i < menu.length; i++) {
        menu[i]['category'] = menu[i]['hasMenu.categoryId'];
        delete menu[i]['hasMenu.categoryId'];
      }

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