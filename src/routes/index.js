const express = require('express');
const adminRouter = require('./admin/routes');
const router = express.Router();
const authRouter = require("./auth/routes");
const donationRouter = require('./donation/routes');
const userRouter = require('./user/routes');

const Tran = require("../models/transactionsModel")

/* GET home page. */
router.post("/", function (req, res, next) {
  Tran.find().sort({ charityDate: 1 }).populate("author").then(trans => console.log("trans", trans))
  res.status(200).json({
    msg: "You got here.",
  });
});

router.use("/auth", authRouter);
router.use("/donation", donationRouter)
router.use("/user", userRouter)
router.use("/admin", adminRouter)


module.exports = router;




