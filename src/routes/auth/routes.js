const express = require("express");
const authRouter = express.Router();
const authenticate = require("../../utils/authenticate");

const { login, getAll, register, logout } = require("./authController");
authRouter.post("/login", login);
authRouter.get("/getAll", authenticate.verifyUser, authenticate.verifyAdmin, getAll);
authRouter.post("/register", register);
authRouter.get("/logout", logout);

module.exports = authRouter;
