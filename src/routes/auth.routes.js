const passport = require("passport");
const express = require("express");
const {
  login,
  logout,
  authenticate,
} = require("../controllers/auth.controllers");
const { isAuth } = require("../middleware/auth.middleware");
const router = express();

router.post("/login", passport.authenticate("local"), login);
router.post("/logout", isAuth, logout);
router.get("/", isAuth, authenticate);

module.exports = router;
