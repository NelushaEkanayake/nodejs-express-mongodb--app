var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookieParser = require('cookie-parser');
var config = require('./config.js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const maxAge = 3 * 24 * 60 * 60;
exports.maxAge = maxAge;
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: maxAge});
};

var cookieExtractor = function(req) {
    var token = null;
   

    if (req && req.cookies) {
        token = req.cookies.jwt;
        console.log("success");
    }
    
    return token;

};

var opts = {};
opts.jwtFromRequest = cookieExtractor; 
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});



