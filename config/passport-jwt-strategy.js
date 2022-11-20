const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const JWTStrategy = require("passport-jwt").Strategy;

const dotenv = require("dotenv");
const con = require("./mysql");
const { SELECTCON } = require("../utils/constants");
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  "customer",
  new JWTStrategy(opts, async function (jwt_payload, done) {
    try {
      let query = SELECTCON("Customer", {
        id: jwt_payload.id,
      });
      con.query(query, (err, results) => {
        if (results.length == 1) {
          done(null, results[0]);
        } else {
          done(null, false);
        }
      });
    } catch (err) {
      done(err, false);
    }
  })
);

passport.use(
  "admin",
  new JWTStrategy(opts, async function (jwt_payload, done) {
    try {
      if (jwt_payload.id == "1") {
        done(null, {
          id: 1,
        });
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  })
);

module.exports = passport;
