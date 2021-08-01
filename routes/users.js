var express = require("express");
const User = require("../models/users");

var userRouter = express.Router();

/* GET users listing. */
userRouter
  .route("/")
  .get((req, res, next) => {
    User.find()
      .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    User.create(req.body)
      .then((user) => {
        console.log("User Created ", user);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /users");
  })
  .delete((req, res, next) => {
    User.deleteMany()
      .then((user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      })
      .catch((err) => next(err));
  });

module.exports = userRouter;
