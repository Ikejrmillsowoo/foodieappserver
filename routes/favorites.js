var express = require("express");
const Favorite = require("../models/favorites");

var favoritesRouter = express.Router();

/* GET favorites listing. */
favoritesRouter
  .route("/")
  .get((req, res, next) => {
    Favorite.find()
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Favorite.create(req.body)
      .then((favorite) => {
        console.log("Favorite Created ", favorite);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
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
