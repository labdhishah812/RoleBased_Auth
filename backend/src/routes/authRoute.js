const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register/customer", authController.register);
router.post("/register/admin", authController.register);
router.post("/login", authController.login);
router.post("/admin/login", authController.login);

module.exports = router;
