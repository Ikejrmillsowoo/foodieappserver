const express = require("express");
const Passport = require("passport");
const checkNotAuthenticated = require("../middleware/notAuthenticated");
const signupRouter = express.Router();
const User = require("../models/users");

signupRouter
  .route("/")
  .get((req, res, next) => {
    console.log(req.body);
    User.find({ username: req.body.username })

      .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    User.create(req.body, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        if (req.body.username) {
          user.username = req.body.username;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        user.save((err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    });
    //console.log(`message posted`);
    // Passport.authenticate("local", {
    //   successRedirect: "/",
    //   failureRedirect: "/login",
    //   failureFlash: true,
    // });
    // User.create(req.body)
    //   .then((user) => {
    //     console.log("User Created ", user);
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type", "application/json");
    //     res.json(user);
    //   })
    //   .catch((err) => next(err));
  });

module.exports = signupRouter;
