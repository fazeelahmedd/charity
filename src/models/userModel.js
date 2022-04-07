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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

User.plugin(passportLocalMongoose);
User.virtual("donations", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "author",
});
module.exports = mongoose.model("User", User);
