const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const jwtMiddlewares = require('../../middlewares/middlewares');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;