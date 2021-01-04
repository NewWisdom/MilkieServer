const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { manageService } = require('../service');

module.exports = {
  deleteRequest: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId } = req.params;
    const { reason } = req.body;

    console.log(userId);
    console.log(cafeId);
    console.log(reason);
    if (!userId || !cafeId || !reason){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const existingCafe = await manageService.readOneCafe(cafeId);
      if (!existingCafe) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE));
      }

      const deleteManage = await manageService.registerDeleteRequest(reason, userId, cafeId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_DELETE_REQUEST_SUCCESS));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
}