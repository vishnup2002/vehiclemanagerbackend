const con = require("../../config/mysql");
const { SELECTCON } = require("../../utils/constants");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

module.exports.registerCustomer = (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  let query = SELECTCON("Customer", {
    email,
  });

  con.query(query, (err, results) => {
    if (results.length == 1) {
      return res.status(409).send({
        message: "Email already exists!!",
      });
    } else {
      query = `insert into Customer(name,email,password) values ('${name}','${email}','${password}')`;
      con.query(query, (err, results1) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          query = SELECTCON("Customer", {
            email,
          });
          con.query(query, (err, results) => {
            const savedUser = results[0];
            return res.status(200).json({
              message:
                "Account created and Sign-in successful.. find the token",
              data: {
                token: jwt.sign(savedUser, process.env.SECRET_KEY, {
                  expiresIn: "9999999",
                }),
              },
            });
          });
        }
      });
    }
  });
};

module.exports.createSession = (req, res) => {
  try {
    const { email, password } = req.body;
    let query = SELECTCON("Customer", { email, password });
    console.log(query);
    con.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          err,
        });
      }

      if (results.length == 0) {
        return res.status(422).send({
          message: "Invalid email/password!!",
        });
      } else {
        const user = results[0];
        return res.status(200).json({
          message: "Sign-in successful.. find the token",
          data: {
            token: jwt.sign(user, process.env.SECRET_KEY, {
              expiresIn: "9999999",
            }),
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.adminCreateSession = (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "admin" && password === "admin") {
      return res.status(200).json({
        message: "Sign-in successful.. find the token",
        data: {
          token: jwt.sign({ id: 1 }, process.env.SECRET_KEY, {
            expiresIn: "9999999",
          }),
        },
      });
    } else {
      return res.status(422).send({
        message: "Invalid email/password!!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
