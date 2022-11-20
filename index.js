const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/mysql");
dotenv.config();

const app = express();
const port = process.env.PORT;
const cors = require("cors");

const passportJWT = require("./config/passport-jwt-strategy");

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`server running on port ${port}`);
});
