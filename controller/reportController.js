const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { reportService } = require('../service');

module.exports = {
  deleteCafe: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId } = req.params;
    const { reason } = req.body;

    if (!userId || !cafeId || !reason){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const existingCafe = await reportService.readOneCafe(cafeId);
      if (!existingCafe) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE));
      }

      const alreadyRequest = await reportService.readOneDeleteCafe(userId);
      if (alreadyRequest) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_DELETE_REQUEST_USER));
      }

      const result = await reportService.registerDeleteCafe(reason, userId, cafeId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_DELETE_REQUEST_SUCCESS));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
  editCafe: async (req, res) => {
    const userId = req.userIdx;
    const { cafeId } = req.params;
    const { reason } = req.body;

    if (!userId || !cafeId || !reason){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const existingCafe = await reportService.readOneCafe(cafeId);
      if (!existingCafe) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NOT_EXISTING_CAFE));
      }

      const alreadyRequest = await reportService.readOneEditCafe(userId);
      if (alreadyRequest) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EDIT_REQUEST_USER));
      }

      const result = await reportService.registerEditCafe(reason, userId, cafeId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REGISTER_EDIT_REQUEST_SUCCESS));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
  readReports: async (req, res) => {
    const userId = req.userIdx;
    
    try {
      const reports = new Object();
      const cancel = 1;
      const progress = 2;
      const confirm = 3;

      const canceledReports = await reportService.readReportsByStatus(userId, cancel);
      if (canceledReports.length == 0) {
        reports['1']= []
      } else {
        reports['1'] = canceledReports
      }

      const progressReports = await reportService.readReportsByStatus(userId, progress);
      if (!progressReports) {
        reports['2']= []
      } else {
        reports['2'] = progressReports
      }

      const confirmedReports = await reportService.readReportsByStatus(userId, confirm);
      if (!confirmedReports) {
        reports['3']= []
      } else {
        reports['3'] = confirmedReports
      }
    
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_REPORTS_SUCCESS, reports));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
}