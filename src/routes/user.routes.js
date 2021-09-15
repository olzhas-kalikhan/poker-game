const express = require("express");
const router = express();
const { createUser } = require("../controllers/user.controllers");

router.post("/", createUser);

module.exports = router;
