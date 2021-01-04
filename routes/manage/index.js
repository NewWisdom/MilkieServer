const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const manageController = require('../../controller/manageController');

router.post('/:cafeId/deleteCafe', jwtMiddleware.userJwt, manageController.deleteRequest);

module.exports = router;