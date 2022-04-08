const db = require("../../library/db");
const Transaction = db.Transaction;
const User = db.User;
const {
  USER_MESSAGES: { NOT_FOUND, DATA_NOT_FOUND },
} = require("../../messages/index");

// const userProfile = async (username) => {
//     try {
//         const data = await Charity.find({ username }).lean()
//         if (data && data[0].hasOwnProperty('hash')) {
//             delete data[0].hash
//             const {fullName,phone} =data[0]
//             const totalAmount=data[0].trx.reduce((total, obj) => obj.totalAmount + total,0)
//             const totalTransactions = data[0].trx.length
//             return {username,fullName,phone,totalAmount,totalTransactions};
//         }
//         else throw {message:DATA_NOT_FOUND}

//     }
//     catch (error) {
//         return { message: NOT_FOUND }
//     }
// }
const userProfile = async (req) => {
  try {
    const fullName = req.user.fullName;
    const username = req.user.username;
    const phone = req.user.phone;
    const totalAmount = await Transaction.find({username}, ["totalAmount"]);
    let amount = totalAmount.reduce(
        (total, current) => current.totalAmount + total,
        0
      );

    return { fullName, username, phone, amount };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  userProfile,
};
