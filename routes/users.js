var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
//var Doctor = require('../models/doctor');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var passport = require('passport');

var authenticate = require('../authenticate');

var userRouter = express.Router();

userRouter.use(bodyParser.urlencoded({
    extended: true
}));
userRouter.use(bodyParser.json());



userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



userRouter.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
     
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      
    
       user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

        
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });

      });
    }

    

  });




});



userRouter.post('/login', passport.authenticate('local'), (req, res) => {
 
  
  var maxAge =authenticate.maxAge;
  var uid = req.user._id;
  var name = req.user.firstname;
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  
  res.cookie('jwt',token, {httpOnly:true, maxAge : maxAge * 1000});
  res.status(201).json({user : uid , name : name});

});



userRouter.get('/logout', (req, res) => {
  var x = true;
  exports.x=x;

  try{
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');
  }
  catch {
    var err = new Error('You are not logged in!');
    err.status = 403;
    
  }
});


module.exports = userRouter;
