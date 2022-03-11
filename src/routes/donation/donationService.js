const db = require("../../library/db");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const User = db.User;
const Transaction = db.Transaction
const {
    DONATION_MESSAGES: {
        SUCCESSFULLY_ADDED,
        USERNAME_NOT_FOUND
    }
} = require("../../messages/index")

const addDonation = async (data) => {
    try {
        const { username, zakat, iftar, donation, ration, sehri, totalAmount, charityDate } = data;
        const user = await User.findOne({ username })
        if (user) {
            await Transaction.create({ username })
                .populate("author"),
            {


                totalAmount: totalAmount,
                zakat: zakat,
                iftar: iftar,
                donation: donation,
                sehri: sehri,
                ration: ration,
                charityDate: charityDate

            }

            return { message: SUCCESSFULLY_ADDED };
        }
        else {
            throw { message: USERNAME_NOT_FOUND, status: 404 }
        }
    }
    catch (error) {
        console.log(error.message)
        throw error
    }
}

const getDonation = async (username) => {
    try {
        const data = await Transaction.find({ username }).lean()
        if (data && data[0].hasOwnProperty('hash')) {
            delete data[0].hash
        }
        const ans = data[0].trx.reduce((total, obj) => obj.totalAmount + total, 0)
        console.log(ans)
        return data[0];
    }
    catch (error) {
        return { message: USERNAME_NOT_FOUND }
    }
}



module.exports = {
    addDonation,
    getDonation
}  