const express = require("express");
const adminRouter = express.Router();
const { adminPortal,getAllTransactions, getTransactionsByID } = require("./adminController");
const authenticate = require("../../utils/authenticate");



adminRouter.get("/",authenticate.verifyUser, authenticate.verifyAdmin, adminPortal);
adminRouter.get("/transactions",authenticate.verifyUser, authenticate.verifyAdmin, getAllTransactions)
adminRouter.get("/transactions/:id",authenticate.verifyUser, authenticate.verifyAdmin, getTransactionsByID)


module.exports = adminRouter;