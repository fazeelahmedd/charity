const express = require("express");
const userRouter = express.Router();

const { userProfile } = require("./userController");



userRouter.get("/:username", userProfile);

module.exports = userRouter;