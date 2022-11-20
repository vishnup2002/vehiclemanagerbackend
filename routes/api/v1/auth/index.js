const express = require("express");
const {
  registerCustomer,
  createSession,
  adminCreateSession,
} = require("../../../../controllers/api/auth");
const router = express.Router();

router.post("/user/register", registerCustomer);
router.post("/user/create-session", createSession);
router.post("/admin/create-session", adminCreateSession);
module.exports = router;
