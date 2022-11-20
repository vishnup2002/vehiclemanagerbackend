const express = require("express");
const passport = require("passport");
const {
  addVehicle,
  viewVehicles,
  bookService,
  viewServiceReq,
} = require("../../../../controllers/api/user");
const router = express.Router();

router.post(
  "/add-vehicle",
  passport.authenticate("customer", { session: false }),
  addVehicle
);

router.get(
  "/view-vehicles",
  passport.authenticate("customer", { session: false }),
  viewVehicles
);

router.post(
  "/book-service",
  passport.authenticate("customer", { session: false }),
  bookService
);

router.get(
  "/view-service-req",
  passport.authenticate("customer", { session: false }),
  viewServiceReq
);

module.exports = router;
