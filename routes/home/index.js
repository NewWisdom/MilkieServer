const express = require('express');
const router = express.Router();
const homeController = require('../../controller/homeController');
const jwtMiddlewares = require('../../middlewares/middlewares');

router.get('/milkyHome', jwtMiddlewares.userJwt, homeController.milkyHome);
router.post('/categoryHome', jwtMiddlewares.userJwt, homeController.categoryHome);

module.exports = router;