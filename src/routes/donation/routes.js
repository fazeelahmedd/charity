const express = require("express");
const donationRouter = express.Router();
const authenticate = require("../../utils/authenticate");
const { addDonation, getDonation } = require("./donationController");

donationRouter.post("/add", authenticate.verifyUser, addDonation);
donationRouter.get("/get", authenticate.verifyUser, getDonation);

module.exports = donationRouter;
