if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const withAuth = require("./middleware/middleware");
const auth = require("./middleware/authenticate");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var favoritesRouter = require("./routes/favorites");
var signupRouter = require("./routes/signup");

// const mongoose = require("mongoose");

// const url = "mongodb://localhost:27017/foodiesapp";
// const connect = mongoose.connect(url, {
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// connect.then(
//   () => console.log("Connected correctly to server"),
//   (err) => console.log(err)
// );

var app = express();
const initializePassport = require("./passport.config");
const loginRouter = require("./routes/login");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(flash());
app.use(passport.initialize());
//to persist data
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(cookieParser());
// insert authentication here.

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
// function auth(req, res, next) {
//   console.log(req.headers);
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     const err = new Error("You are not authenticated!");
//     res.setHeader("WWW-Authenticate", "Basic");
//     err.status = 401;
//     return next(err);
//   }

//   const auth = Buffer.from(authHeader.split(" ")[1], "base64")
//     .toString()
//     .split(":");
//   const user = auth[0];
//   const pass = auth[1];
//   if (user === "admin" && pass === "password") {
//     return next(); // authorized
//   } else {
//     const err = new Error("You are not authenticated!");
//     res.setHeader("WWW-Authenticate", "Basic");
//     err.status = 401;
//     return next(err);
//   }
// }

//app.use(withAuth);
app.use("/favorites", favoritesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
