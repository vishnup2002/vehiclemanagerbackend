const express = require("express");
const passport = require("passport");
const { viewServiceReq } = require("../../../../controllers/api/admin");
const router = express.Router();

router.get(
  "/view-service-req",
  passport.authenticate("admin", { session: false }),
  viewServiceReq
);

module.exports = router;
