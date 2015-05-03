var express = require('express');
var router = express.Router();
var api = require('../flightdata');
var fs = require('fs');
var touch = require("touch");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Book it Simon!!' });
});
router.get('/update', function(req, res, next) {
  touch('/srv/bookitsimon.run',null,null);
});
router.get('/sample', api.getSample);
router.post('/search', api.search);

module.exports = router;
