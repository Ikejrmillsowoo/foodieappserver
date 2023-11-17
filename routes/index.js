var express = require("express");
var router = express.Router();

("use strict");

const term = "food";
const location = "19146";

const yelp = require("yelp-fusion");

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
//apiKey is placed in gitignore file.
const apiKey = process.env.API_KEY;

console.log(apiKey);

const searchRequest = {
  term,
  location,
};

router.get("/", (req, res, next) => {
  const client = yelp.client(apiKey);
  client
    .search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(firstResult, null, 4);
      res.send(prettyJson);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});

router.post("/", (req, res, next) => {
  const newSearchRequest = req.body;
  console.log(newSearchRequest);
  const client = yelp.client(apiKey);
  client
    .search(newSearchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(firstResult, null, 4);

      res.send(prettyJson);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});

module.exports = router;
