const express = require('express');
const router = express.Router();
const universeController = require('../../controller/universeController');
const jwtMiddlewares = require('../../middlewares/middlewares');

router.post('/:universeId', jwtMiddlewares.userJwt, universeController.universeOn);
module.exports = router;