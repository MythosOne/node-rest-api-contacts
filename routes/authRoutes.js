const express = require("express");
const ctrl = require("../controllers/authController");
const { validateBody, authenticate } = require("../middleware");
const { schemas } = require("../model/userModel");

const router = express.Router();
console.log(schemas.registerSchema);
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
