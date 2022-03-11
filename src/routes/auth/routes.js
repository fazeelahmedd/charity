const express = require("express");
const authRouter = express.Router();

const {
    authenticate, getAll, register, logout

} = require("./authController");
authRouter.post("/authenticate", authenticate);
authRouter.get("/getAll", getAll);
authRouter.post("/register", register);
authRouter.get("/logout", logout);


module.exports = authRouter;
