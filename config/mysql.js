const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_UNAME,
  password: process.env.MYSQL_PASSWD,
  database: "VM",
});

con.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("connected to DB");
});

module.exports = con;
