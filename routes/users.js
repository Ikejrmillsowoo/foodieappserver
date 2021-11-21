var express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware/middleware.js");
const auth = require("../middleware/authenticate");
const notAuth = require("../middleware/notAuthenticated");
const passport = require("passport");

var userRouter = express.Router();

const secret = "mysecretsshhh";

/* GET users listing. */
userRouter.route("/").get((req, res) => {
  console.log("we here now");
  res.send("no check auth");
});

userRouter
  .route("/signup")
  .get((req, res) => {
    res.send("not logged in");
  })
  .post((req, res) => {
    console.log(`create user: ${req.body}`);
    // passport.authenticate("local", {
    //   successRedirect: "/",
    //   failureRedirect: "/login",
    //   failureFlash: true,
    // });
  });
// userRouter
//   .route("/")
//   .get((req, res, next) => {
//     User.find()
//       .then((users) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(users);
//       })
//       .catch((err) => next(err));
//   })
//   .post((req, res, next) => {
//     User.create(req.body)
//       .then((user) => {
//         console.log("User Created ", user);
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(user);
//       })
//       .catch((err) => next(err));
//   })
//   .put((req, res) => {
//     res.statusCode = 403;
//     res.end("PUT operation not supported on /users");
//   })
//   .delete((req, res, next) => {
//     User.deleteMany()
//       .then((user) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(user);
//       })
//       .catch((err) => next(err));
//   });

// userRouter
//   .route("/login")
//   .get((req, res, next) => {
//     User.find()
//       .then((users) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(users);
//       })
//       .catch((err) => next(err));
//   })
//   .post((req, res, next) => {
//     console.log(req.body);
//     const { username, password } = req.body;
//     User.findOne({ username }, function (err, user) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({
//           error: "Internal error please try again",
//         });
//       } else if (!user) {
//         res.status(401).json({
//           error: "Incorrect username or password",
//         });
//       } else {
//         user.isCorrectPassword(password, function (err, same) {
//           if (err) {
//             res.status(500).json({
//               error: "Internal error please try again",
//             });
//           } else if (!same) {
//             res.status(401).json({
//               error: "Incorrect username or password",
//             });
//           } else {
//             // Issue token
//             const payload = { username };
//             const token = jwt.sign(payload, secret, {
//               expiresIn: "1h",
//             });
//             res
//               .cookie("token", token, { httpOnly: true })
//               .sendStatus(200, console.log("success"));
//           }
//         });
//       }
//     });
//   })
//   .put((req, res) => {
//     res.statusCode = 403;
//     res.end("PUT operation not supported on /users");
//   })
//   .delete((req, res, next) => {
//     User.deleteMany()
//       .then((user) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(user);
//       })
//       .catch((err) => next(err));
//   });

module.exports = userRouter;
