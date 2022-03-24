const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

const User = require("../models/userModel");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

secKey = process.env.secretKey;

exports.getToken = function (user) {
  return jwt.sign(user, secKey, {});
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, _, next) => {
  User.findOne({ _id: req.user._id })
    .then(
      (user) => {
        if (user.admin) {
          next();
        } else {
          err = new Error("You are not authorized to perform this operation!");
          err.status = 403;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};
