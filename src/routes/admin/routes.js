const express = require("express");
const adminRouter = express.Router();

const { adminPortal } = require("./adminController");



adminRouter.get("/", adminPortal);

module.exports = adminRouter;