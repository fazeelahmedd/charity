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
    const { username } = req.params;
    const viewDonation = await donationService.getDonation(username);
    res.status(200).json(viewDonation);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

const getDonationForUser = async (req,res) => {
  try{
    const donations = await donationService.getDonationForUser(req.user._id)
    res.status(200).json(donations);
  }catch(error){
    res.status(409).json({ error: error.message });

  }
}

const userNameValidation = async (req,res) => {
  try{
    const username = await donationService.userNameValidation()
    res.status(200).json(username);
  }catch(error){
    res.status(409).json({ error: error.message });

  }
}

module.exports = {
  addDonation,
  getDonation,
  getDonationForUser,
  userNameValidation
};
