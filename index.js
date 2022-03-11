const express = require("express");
const app = express();
const myroute = require('./src/routes');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT
const { GENERAL_MESSAGES: { HEALTH, LISTENING } } = require('./src/messages');

app.use(cors());
app.use(bodyParser.json());
app.use('/', myroute)


app.get("/health", function (req, res) {
  res.status(200).json({
    success: true,
    message: HEALTH,
  });
});

module.exports = app.listen(PORT, () => {
  console.log(LISTENING + PORT);
});