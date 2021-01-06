const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const manageController = require('../../controller/reportController');

router.post('/:cafeId/deleteCafe', jwtMiddleware.userJwt, manageController.deleteCafe);
router.post('/:cafeId/editCafe', jwtMiddleware.userJwt, manageController.editCafe);
router.get('/', jwtMiddleware.userJwt, manageController.readReports);

module.exports = router;