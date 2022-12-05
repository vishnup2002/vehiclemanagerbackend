const express = require("express");
const passport = require("passport");
const {
  addVehicle,
  viewVehicles,
  bookService,
  viewServiceReq,
  viewUserDetails,
  removeVehicle,
  modifyName,
} = require("../../../../controllers/api/user");
const router = express.Router();

router.post(
  "/add-vehicle",
  passport.authenticate("customer", { session: false }),
  addVehicle
);

router.post(
  "/remove-vehicle",
  passport.authenticate("customer", { session: false }),
  removeVehicle
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

router.get(
  "/view-user-details",
  passport.authenticate("customer", { session: false }),
  viewUserDetails
);

router.post(
  "/modify-name",
  passport.authenticate("customer", { session: false }),
  modifyName
);

module.exports = router;
