const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const router = require("./routes/index");
const morgan = require("morgan");

var passport = require("passport");
const { socketSetup } = require("./_config/socket.config");
require("dotenv").config();

//Keys
const mongoKey = process.env.MONGODB_KEY;
const sessionSecret = process.env.SESSION_SECRET;

const app = express();
const port = process.env.PORT || 3001;

const server = require("http").createServer(app);
const io = require("socket.io")(server);
socketSetup(io);

const connection = mongoose
  .connect(mongoKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => res.connection.getClient());

const sessionStore = MongoStore.create({
  clientPromise: connection,
  collection: "sessions",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

require("./_config/passport.config");
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log(req.session);
//   next();
// });
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/", router);
const errorHandler = (err, req, res, next) => {
  if (err) res.json({ err: `error: ${err}` });
};
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
