const db = require("../../library/db");
const config = require("../../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.User;
const passport = require("passport");
const Transaction = db.Transaction;
const {
  AUTH_MESSAGES = {
    INVALID_USERNAME,
    INVALID_FORMAT_PASSWORD,
    SUCCESSFULLY_REGISTERED,
  },
} = require("../../messages/index");
const authenticate = require("../../utils/authenticate");

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, status: "Login Unsuccessful!", err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Login Unsuccessful!",
          err: "Could not log in user!",
        });
      }

      const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: true, status: "Login Successful!", token: token });
    });
  })(req, res, next);
};

const getAll = async () => {
  const data = await User.find();
  if (data && data[0].hasOwnProperty("hash")) {
    delete data[0].hash;
  }
  console.log(data[0].admin);
  if (data[0].admin == true) {
    delete data[0];
  }
  if (data && data[0].hasOwnProperty("admin")) {
    delete data[0];
  }
  return { ...data };
};

const register = async (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.fullName) user.firstname = req.body.fullName;
        if (req.body.phone) user.firstname = req.body.phone;

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            const token = authenticate.getToken({ _id: user._id });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Registration Successful!",
              token,
            });
          });
        });
      }
    }
  );
};

module.exports = {
  login,
  getAll,
  register,
};
