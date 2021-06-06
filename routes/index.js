var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../lib/jwt'); //helper jwb
const {isLoggedIn } = require('../lib/auth');

const {getMovies, getActors, getDirectors} = require('../controller/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/movies',isLoggedIn,  authenticateToken, getMovies);

router.get('/actors/:id?', getActors);

router.get('/directors/:id?', getDirectors);

module.exports = router;
