const db = require("../../library/db");
const User = db.User;
const Transaction = db.Transaction
const {
    USER_MESSAGES: {
        NOT_FOUND,
        DATA_NOT_FOUND
    }
} = require("../../messages/index")


const adminPortal = async () => {
    try {
        
        const data = await Charity.find();
        if (data && data[0].hash) {
            delete data[0].hash
            const totalAmount=data.map(obj=>obj.trx.map(amnt=>amnt.totalAmount)).flat().reduce((total, current) => current + total)
            const userCount= data.map(n=>n.name).length
            const transactions = data.trx[0]
            console.log(data.trx[0])
            return {userCount,totalAmount,transactions};
        }
        else throw {message:DATA_NOT_FOUND}
       
    }
    catch (error) {
        return { message: DATA_NOT_FOUND }
    }
}
const getAllTransactions = async () => {
    const data = await Charity.aggregate([{$unwind : "$trx" }]).sort ({charityDate : 1})
    const transactions=data.map(obj=>obj.trx)
    return transactions;
    Tran.find().sort({ charityDate: 1 }).populate("author").then(trans => console.log("trans", trans))
    res.status(200).json



}
module.exports = {
    adminPortal,
    
}  




  