const express = require("express");
const Passport = require("passport");
const checkNotAuthenticated = require("../middleware/notAuthenticated");
const signupRouter = express.Router();
const User = require("../models/users");

signupRouter
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
    console.log(req.body);
    // Passport.authenticate("local", {
    //   successRedirect: "/",
    //   failureRedirect: "/login",
    //   failureFlash: true,
    // });
    User.create(req.body)
      .then((user) => {
        console.log("User Created ", user);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      })

      .catch((err) => next(err));
  });

module.exports = signupRouter;
