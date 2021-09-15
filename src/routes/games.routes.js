const express = require("express");
const { getGames, getGame } = require("../controllers/games.controllers");

const { isAuth } = require("../middleware/auth.middleware");
const router = express();

router.get("/", isAuth, getGames);
router.get("/:gameID", isAuth, getGame);
module.exports = router;
