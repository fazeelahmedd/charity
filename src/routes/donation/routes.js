const express = require("express");
const donationRouter = express.Router();
const authenticate = require("../../utils/authenticate");
const {
  addDonation,
  getDonation,
  getDonationForUser,
  userNameValidation
} = require("./donationController");

donationRouter.post("/add", authenticate.verifyUser, authenticate.verifyAdmin, addDonation);
donationRouter.get(
  "/get/:username",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  getDonation
);
donationRouter.get(
  "/userDonation",
  authenticate.verifyUser,
  getDonationForUser
);
donationRouter.get("/usernameValidation",
authenticate.verifyUser,
authenticate.verifyAdmin,
userNameValidation)
module.exports = donationRouter;
