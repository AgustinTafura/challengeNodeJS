const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers'); //helper pass encrypt
const {generateAccessToken} = require('../lib/jwt'); //helper jwb
const {User}  = require('../models/index');


const {isLoggedIn,  isNotLoggedIn } = require('../lib/auth');

router.get('/register', isNotLoggedIn, (req, res, next) => {
  res.render('auth/register')
  req.session.errors = null;
  req.session.dataForm = null;
})

router.post('/register', isNotLoggedIn, (req, res, next) => {
    var redirectTo = req.session.redirectTo || '/';

  passport.authenticate('local.singup', {
      successRedirect: redirectTo,
      failureRedirect: '/register',
      successFlash: true,
      failureFlash: true
    })(req, res, next),

  delete req.session.redirectTo
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('auth/login');
  req.session.errors = null;
  req.session.dataForm = null;
})

router.post('/login',passport.authenticate('local.singin',{failureRedirect: '/login'}), (req, res, next) => {
  var redirectTo = req.session.redirectTo || '/';

  var userId = req.user.dataValues.id
  var token = generateAccessToken(userId);
  res.cookie('jwt', token).redirect(redirectTo) //token should be use un headers request
  delete req.session.redirectTo
})

router.post('/logout', function(req, res){
  req.logout();
  delete req.session.redirectTo
  res.redirect('/login');
});


module.exports = router;
