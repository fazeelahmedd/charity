const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    totalAmount: { type: Number, default: null },
    zakat: { type: Number, default: null },
    ration: { type: Number, default: null },
    donation: { type: Number, default: null },
    iftar: { type: Number, default: null },
    sehri: { type: Number, default: null },
    remainingAmount: { type: Number, default: null },
    charityDate: { type: Date, default: Date.now },
    username: { type: String, required : true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Transaction", schema, "transaction")