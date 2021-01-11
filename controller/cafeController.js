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
      if (cafeInfo.length == 0) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE_INFO));
      }
      /** 데이터 가공 */
      const honeyTips = []
      for (let i = 0; i < cafeInfo.length; i++) {
        if (cafeInfo[i]['hasCafe.id']){
          honeyTips.push(cafeInfo[i]['hasCafe.id']);
          delete cafeInfo[i]['hasCafe.id'];
        } else {
          delete cafeInfo[i]['hasCafe.id'];
        }
      }
      cafeInfo = cafeInfo[0]
      cafeInfo['honeyTip'] = honeyTips;
    
      let menu = await cafeService.readCafeMenu(cafeId);
      if (!menu) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE_MENU));
      }
      for (let i = 0; i < menu.length; i++) {
        let temp = []
        for (let j = 0; j < menu[i].dataValues['hasMenu'].length; j++) {
          temp.push(menu[i].dataValues.hasMenu[j].dataValues['categoryId'])
        }
        menu[i].dataValues['category'] = temp;
        delete menu[i].dataValues['hasMenu'];
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