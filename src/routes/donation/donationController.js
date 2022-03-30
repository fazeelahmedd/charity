const donationService = require("./donationService");

const addDonation = async (req, res) => {
  try {
    const donation = await donationService.addDonation(req.body, req.user);
    res.status(200).json(donation);
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const getDonation = async (req, res) => {
  try {
    const { _id } = req.user;
    const viewDonation = await donationService.getDonation(_id);
    console.log(viewDonation);
    res.status(200).json(viewDonation);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};
module.exports = {
  addDonation,
  getDonation,
};
