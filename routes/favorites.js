var express = require("express");
const Favorite = require("../models/favorites");
const withAuth = require("../middleware/middleware");

var favoritesRouter = express.Router();

/* GET favorites listing. */
favoritesRouter
  .route("/")
  .get((req, res, next) => {
    Favorite.find().then((favorites) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(favorites);
    });
    // .catch((err) => next(err));
  })
  .post((req, res, next) => {
    console.log(req.body);
    Favorite.findOne({ name: req.body.name }, (err, favorite) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (favorite) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Favorite already posted!" });
        } else {
          Favorite.create(req.body, (err, favorite) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
            } else {
              if (req.body) {
                favorite = req.body;
              }
              favorite.save((err) => {
                if (err) {
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.json({ err: err });
                  return;
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ success: true, status: "Favorite Posted!" });
              });
              //  .catch((err) => next(err));
            }
          });
        }
      }
    });
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /users");
  })
  .delete((req, res, next) => {
    Favorite.deleteMany()
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
  });

module.exports = favoritesRouter;
