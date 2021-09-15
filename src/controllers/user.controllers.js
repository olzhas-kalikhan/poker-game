const User = require("../models/User.model");

exports.createUser = (req, res, next) => {
  const { email, username, password } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (user) return next("user already exists");
      const newUser = new User({ email, username, password });
      newUser.save((err) => {
        if (err) return next(err);
        return res.status(201).json({
          message: {
            msgBody: "Account succesfully created",
            msgError: false,
          },
        });
      });
    })
    .catch((err) => next(err));
};
