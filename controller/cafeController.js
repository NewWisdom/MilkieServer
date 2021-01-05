const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { cafeService } = require('../service');

module.exports = {
  readOneCafeInfo: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId } = req.params;

    if (!userId || !cafeId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const cafe = await cafeService.readOneCafe(cafeId);
      if (!cafe) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE));
      }

      const honeyTip = await cafeService.readCafeHoneyTip(cafeId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_CAFE_INFO_SUCCESS, honeyTip));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
}