const db = require("../../library/db");
const config = require('../../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.User;
const Transaction = db.Transaction
const {
    AUTH_MESSAGES = {
        INVALID_USERNAME,
        INVALID_FORMAT_PASSWORD,
        SUCCESSFULLY_REGISTERED
    }
} = require("../../messages/index")

const authenticate = async (body) => {
    const { username, password } = body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '10m' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

const getAll = async () => {
    const data = await User.find().lean()
    if (data && data[0].hasOwnProperty('hash')) {
        delete data[0].hash
    }
    console.log(data[0].admin)
    if(data[0].admin == true){
        delete data[0]
    }
    // if (data && data[0].hasOwnProperty('admin')) {
    //     delete data[0]
    // }
    return {...data};

}

const register = async (userParam) => {

    const { username, password } = userParam
    if (await User.findOne({ username })) {
        throw { message: AUTH_MESSAGES.ALREADY_REGISTERED, status: 409 }
    }

    if (!username) {
        throw { message: AUTH_MESSAGES.INVALID_USERNAME, status: 406 }
    }

    const user = new User(userParam);

    if (!password) {
        throw { message: AUTH_MESSAGES.INVALID_FORMAT_PASSWORD, status: 406 }
    }
    else {
        user.hash = bcrypt.hashSync(password);
    }

    await user.save();
    return { message: AUTH_MESSAGES.SUCCESSFULLY_REGISTERED }
}



module.exports = {
    authenticate,
    getAll,
    register,


};