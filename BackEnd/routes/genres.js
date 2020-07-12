const express = require("express");
const router = express.Router();
const genre = require("../model/genre");

router.get("/", async function (req, res, next) {
  let genres = await genre.getGenres();
  if (!genres && null === genres) {
    return res.status(500).send({ message: "internal error" });
  }
  return res.json(genres.genre);
});

module.exports = router;
