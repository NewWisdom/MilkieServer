const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../middlewares/middlewares');
const searchController = require('../../controller/searchController');

router.get('/search/cafe', jwtMiddleware.userJwt, searchController.searchHomeByKakaoAPI);
router.get('/report/cafe', jwtMiddleware.userJwt, searchController.searchCafeByKakaoAPI);

module.exports = router;