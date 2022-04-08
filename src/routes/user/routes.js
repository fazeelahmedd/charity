const express = require("express");
const userRouter = express.Router();
const authenticate = require("../../utils/authenticate");

const { userProfile } = require("./userController");



userRouter.get("/", authenticate.verifyUser, userProfile);

module.exports = userRouter;