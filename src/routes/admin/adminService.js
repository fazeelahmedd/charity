const db = require("../../library/db");
const User = db.User;
const Transaction = db.Transaction;
const {
  USER_MESSAGES: { NOT_FOUND, DATA_NOT_FOUND },
} = require("../../messages/index");

const adminPortal = async (req) => {
  try {
    const fullName = req.user.fullName;
    const numberOfUsers = await User.count({ admin: false });
    const totalAmountReceived = await Transaction.find({}, ["totalAmount"]);

    let amount = totalAmountReceived.reduce(
      (total, current) => current.totalAmount + total,
      0
    );
    return {fullName, numberOfUsers, amount}
  } catch (error) {
    return { error };
  }
};
const getAllTransactions = async () => {
  const data = await Transaction.find({}, [
    "totalAmount",
    "charityDate",
    "username",
  ])
    .sort({ charityDate: -1 })
    .lean();
  return data;
};

const getTransactionsByID = async (id) => {
  return await Transaction.findById(id).lean();
};
module.exports = {
  adminPortal,
  getAllTransactions,
  getTransactionsByID,
};
