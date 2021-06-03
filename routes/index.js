var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../lib/jwt'); //helper jwb
const {isLoggedIn } = require('../lib/auth');

const {getMovies} = require('../controller/movieController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/movies',isLoggedIn,  authenticateToken,
  getMovies
  // res.render('movies', );
);


module.exports = router;
