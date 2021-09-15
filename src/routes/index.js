const express = require("express");
const router = express();
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const gamesRouter = require("./games.routes");
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/games", gamesRouter);
module.exports = router;
