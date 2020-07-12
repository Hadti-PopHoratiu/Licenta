const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Book_schema = new schema(
  {
    _id: schema.Types.ObjectId,
    name: String,
    author: String,
    date: Date,
    genre: String,
    description: String,
    isbn: Number,
    total: Number,
    used: Number,
    image: String,
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

const bookModel = mongoose.model("book", Book_schema, "Books");

getBook = (input, filter) => {
  //   if (input.user == "true") {
  //     return bookModel.find(filter);
  //   }

  return bookModel
    .find(filter)
    .skip((input.pageNumber - 1) * 5)
    .limit(5)
    .sort({ name: 1 })
    .select({
      name: 1,
      author: 1,
      date: 1,
      genre: 1,
      total: 1,
      used: 1,
      image: 1,
      isbn: 1,
    });
};

getBookCount = function (input, filter) {
  return bookModel.find(filter).count();
};

getBookById = function (input) {
  if (mongoose.Types.ObjectId(input)) {
    return bookModel.findById(input).select({
      name: 1,
      author: 1,
      date: 1,
      genre: 1,
      total: 1,
      used: 1,
      description: 1,
      image: 1,
      isbn: 1,
    });
  }
};

addBook = function (body) {
  body["_id"] = new mongoose.Types.ObjectId();
  body["used"] = 0;
  return bookModel.create(body);
};

editBook = function (id, body) {
  return bookModel.updateOne({ _id: id }, body).exec();
};

editBookUsedCountUp = async function (id) {
  var count = await bookModel.findById(id).map((x) => {
    return x.used;
  });
  return bookModel.updateOne({ _id: id }, { used: count + 1 }).exec();
};

editBookUsedCountDown = async function (id) {
  var count = await bookModel.findById(id).map((x) => {
    return x.used;
  });
  return bookModel.updateOne({ _id: id }, { used: count - 1 }).exec();
};

deleteBook = function (id, body) {
  return bookModel.deleteOne({ _id: id }).exec();
};

module.exports = {
  getBook,
  getBookCount,
  getBookById,
  addBook,
  editBook,
  deleteBook,
  editBookUsedCountUp,
  editBookUsedCountDown,
};

//if(mongoose.Types.ObjectId(input)){} get id books
