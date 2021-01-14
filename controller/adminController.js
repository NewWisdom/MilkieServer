const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { adminService, universeService } = require('../service');

module.exports = {
  cancelReport: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId, rejectReasonId } = req.body;

    if (!userId || !cafeId || !rejectReasonId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    // try {
      const isAdmin = await adminService.isAdmin(userId);
      if (isAdmin.length == 0) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_ADMIN));
      }
      
      const isAlreadyCancel = await adminService.isAlreadyCancel(cafeId);
      if (isAlreadyCancel.length == 0) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.CANCEL_REPORT_FAIL));
      }

      const result = await adminService.cancelReport(cafeId, rejectReasonId);      
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CANCEL_REPORT_SUCCESS));
    // } catch (error) {
    //   return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    // }
  }
}