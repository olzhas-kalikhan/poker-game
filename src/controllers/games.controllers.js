const { gameList } = require("../_utilities/socket.utils");

exports.getGames = (req, res, next) => {
  return res.json(gameList);
};
exports.getGame = (req, res, next) => {
  const gameID = req.params.gameID;
  return res.json(gameList[gameID]);
};
