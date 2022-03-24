const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      default: "",
      // required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
