var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../lib/jwt'); //helper jwb
const {isLoggedIn } = require('../lib/auth');

const {getMovies, createMovie, storeMovie, getActors, getDirectors} = require('../controller/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//Movies
router.get('/movies/',isLoggedIn, getMovies);
// router.get('/movies/create',isLoggedIn, createMovie);
router.get('/movies/create',isLoggedIn, authenticateToken, createMovie);
router.post('/movies/store', storeMovie);



//Actors
router.get('/actors/:id?', getActors);

//Directors
router.get('/directors/:id?', getDirectors);



module.exports = router;
