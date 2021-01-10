const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const searchController = require('../../controller/searchController');

router.get('/:query', jwtMiddleware.userJwt, searchController.searchCafeByKakaoAPI);

module.exports = router;