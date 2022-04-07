const db = require("../../library/db");
const Transaction = db.Transaction;
const User = db.User;
const {
  DONATION_MESSAGES: { SUCCESSFULLY_ADDED, USERNAME_NOT_FOUND },
} = require("../../messages/index");

const addDonation = async (body, user) => {
  if (body === null) {
    err = new Error("Cart not found in request body");
    err.status = 404;
    return next(err);
  }

  try {
    body.author = user._id;
    await Transaction.create(body);
     await Transaction.findById(transaction._id).populate("author");
  } catch (error) {
    throw error;
  }
};

const userNameValidation = async () => {
  try {
    const usernames = await User.find({}, ["username"]).lean()
    console.log(usernames)
    return usernames;
  } catch (error) {
    return { message: USERNAME_NOT_FOUND };
  }
};

const getDonation = async (username) => {
  try {
    const docs = await User.findOne({ username }).populate("donations");
    return docs.donations;
  } catch (error) {
    return { message: USERNAME_NOT_FOUND };
  }
};

const getDonationForUser = async (id) => {
  try {
    return await Transaction.find({ author: id });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addDonation,
  getDonation,
  getDonationForUser,
  userNameValidation
};
