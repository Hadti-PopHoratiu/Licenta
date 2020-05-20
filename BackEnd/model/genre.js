const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Genre_schema = new schema(
  {
    _id: schema.Types.ObjectId,
    genre: [String],
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

const genreModel = mongoose.model("genre", Genre_schema, "Genres");

getGenres = function () {
  return genreModel.findOne();
};

module.exports = { getGenres };
