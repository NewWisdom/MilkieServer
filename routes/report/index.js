const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const manageController = require('../../controller/reportController');

router.post('/:cafeId/deleteCafe', jwtMiddleware.userJwt, manageController.deleteCafe);
router.post('/:cafeId/editCafe', jwtMiddleware.userJwt, manageController.editCafe);

module.exports = router;