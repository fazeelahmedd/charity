const db = require("../../library/db");
const Transaction = db.Transaction;
const {
  DONATION_MESSAGES: { SUCCESSFULLY_ADDED, USERNAME_NOT_FOUND },
} = require("../../messages/index");

const addDonation = async (body, user) => {
  if (body === null) {
    err = new Error("Cart not found in request body");
    err.status = 404;
    return next(err);
  }

  body.author = user._id;
  Transaction.create(body)
    .then(
      (cart) => {
        Transaction.findById(cart._id)
          .populate("author")
          .then((cart) => cart);
      },
      (err) => {
        throw err;
      }
    )
    .catch((err) => next(err));
};

const getDonation = async (username) => {
  try {
    return await Transaction.find()
      .populate("author")
      .then((cart) => cart)
      .catch((err) => next(err));
  } catch (error) {
    return { message: USERNAME_NOT_FOUND };
  }
};

module.exports = {
  addDonation,
  getDonation,
};
