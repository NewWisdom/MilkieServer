const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const manageController = require('../../controller/manageController');

router.post('/:cafeId/deleteRequest', jwtMiddleware.userJwt, manageController.deleteRequest);
router.post('/:cafeId/editRequest', jwtMiddleware.userJwt, manageController.editRequest);

module.exports = router;