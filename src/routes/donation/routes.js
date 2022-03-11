const express = require("express");
const donationRouter = express.Router();

const {
    addDonation,
    getDonation

} = require("./donationController");


donationRouter.post("/add", addDonation);
donationRouter.get("/:username", getDonation);

module.exports = donationRouter;