const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    admin: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", schema, "user")