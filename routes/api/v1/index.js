const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/admin", require("./admin"));

router.get(
  "/test",
  passport.authenticate("customer", { session: false }),
  (req, res) => {
    res.status(200).json({
      message: "api hit customer!!",
    });
  }
);

router.get(
  "/test1",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    res.status(200).json({
      message: "api hit admin!!",
    });
  }
);

module.exports = router;
