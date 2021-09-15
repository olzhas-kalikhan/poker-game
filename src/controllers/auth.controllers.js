const { gameList } = require("../_utilities/socket.utils");

exports.login = (req, res, next) => {
  if (req.user) {
    const { _id, username, points } = req.user;
    return res.json({
      isAuthenticated: true,
      user: { _id, username, points },
      gameList,
    });
  }
};
exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "logged out" });
};
exports.authenticate = (req, res, next) => {
  if (req.user) {
    const { _id, username, points } = req.user;
    return res.json({
      isAuthenticated: true,
      user: { _id, username, points },
      gameList,
    });
  } else {
    return res.status(401).json({ isAuthenticated: false, user: {} });
  }
};
