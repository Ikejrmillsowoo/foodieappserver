const express = require("express");
const Passport = require("passport");
const checkNotAuthenticated = require("../middleware/notAuthenticated");
const loginRouter = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

loginRouter
  .route("/")
  .get((req, res, next) => {
    //console.log(req.body);
    User.find()
      .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    User.findOne({ username: req.body.username })
      .then((user, err) => {
        //console.log(user);
        if (user) {
          console.log(user.password, req.body.password);
          bcrypt
            .compare(req.body.password, user.password)
            .then(function (result) {
              if (result) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: true,
                  status: "login Successful!",
                  username: user.username,
                });
              }
            });
        } else {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        }
      })
      .catch((err) => next(err));
  });

module.exports = loginRouter;
