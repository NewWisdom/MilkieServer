const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const adminController = require('../../controller/adminController');

router.post('/cancel', jwtMiddleware.userJwt, adminController.cancelReport);

module.exports = router;