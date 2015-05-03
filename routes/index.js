var express = require('express');
var router = express.Router();
var api = require('../flightdata');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Book it Simon!!' });
});

router.get('/sample', api.getSample);
router.post('/search', api.search);

module.exports = router;
