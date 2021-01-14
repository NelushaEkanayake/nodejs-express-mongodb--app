var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.route('/events')

.get(authenticate.verifyUser, function(req, res, next) {
  res.render('events', { title: 'Express' });
});

module.exports = router;
