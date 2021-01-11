const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { cafeService, universeService } = require('../service');
const request = require('request-promise');
const { cafe } = require('../models/index');
const { sequelize, Sequelize } = require('../models');
require('dotenv').config();

module.exports = {
  searchCafeByDB: async (req, res) => {
    const userId = req.userIdx;
    const searchWord = req.params.searchWord;
    const Op = Sequelize.Op;
    const operatorsAliases = {
      $like: Op.like,
      $not: Op.not
    }

    // try {
      const searchCafe = await cafe.findAll({
        limit: 14,
        where: {
          [sequelize.Op.or]:{
            namesQuery: sequelize.where(
              sequelize.fn("concat", sequelize.col("firstName"), " ", sequelize.col("lastName")),
            {
              [sequelize.Op.like]: `%${searchWord}%`,
            }
          ),
          cafeName: {[sequelize.Op.like]: `%${searchWord}%`},
        }
      }
    });
      
      if (!searchCafe) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NONE_SEARCH))
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SEARCH_SUCCESS, searchCafe)); 
    // } catch (error) {
    //   return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    // }
  },
  searchCafeByKakaoAPI: async (req, res) => {
    const userId = req.userIdx;
    const query  = req.query.query;
    const { KAKAO_KEY } = process.env;

    try {
      const kakaoOptions = {
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json',  
        method: 'GET',
        headers: {
          'Authorization': `KakaoAK ${KAKAO_KEY}`
        },
        qs: {
          query : query 
        },
        encoding: 'UTF-8',
      }
  
      const result = await request(kakaoOptions)
                        .then(function(response) {
                          return JSON.parse(response).documents;
                        })
                        .catch(function (err) {
                          return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
                      });
      const cafes = [];
      for (let i = 0; i < result.length; i++) {
        let cafe = new Object();
        cafe["cafeName"] = result[i].place_name;
        cafe["cafeAddress"] = result[i].road_address_name;
        cafe["cafeMapX"] = result[i].x;
        cafe["cafeMapY"] = result[i].y;
        let isExistingCafeByPosition = await cafeService.isExistingCafe(result[i].id);
        if (!isExistingCafeByPosition){
          cafe["isReported"] = false;
        } else {
          cafe["isReported"] = true;
        }
        cafes.push(cafe);
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_CAFE_INFO_SUCCESS,cafes));     
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
}