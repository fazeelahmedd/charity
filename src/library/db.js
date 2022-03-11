const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { GENERAL_MESSAGES: { CONNECTION_SUCCESSFUL } } = require('../messages');

const DB = mongoose.connect(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log(CONNECTION_SUCCESSFUL)
}).catch(e => {
  console.log(e);
})

module.exports = {
  User: require('../models/userModel'),
  Transaction: require('../models/transactionsModel'),
  DB
};