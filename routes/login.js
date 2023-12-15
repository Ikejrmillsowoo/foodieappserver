// const express = require("express");
// const Passport = require("passport");
// const checkNotAuthenticated = require("../middleware/notAuthenticated");
// const loginRouter = express.Router();
// const User = require("../models/users");

// loginRouter
//   .route("/")
//   .get((req, res, next) => {
//     //console.log(req.body);
//     User.find()
//       .then((users) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(users);
//       })
//       .catch((err) => next(err));
//   })
//   .post((req, res, next) => {
//     Passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/login",
//       failureFlash: true,
//     });
//     User.findOne({ username: req.body.username })
//       .then((user) => {
//         console.log(user.username, "logged in");
//         res.status(200).send(`${user.username} is logged in`);
//         // res.statusCode = 200;
//         // res.setHeader("Content-Type", "application/json");
//         // res.json(user.username);
//       })
//       .catch((err) => next(err));
//   });

// module.exports = loginRouter;
