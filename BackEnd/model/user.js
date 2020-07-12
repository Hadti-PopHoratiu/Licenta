const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User_schema = new schema(
  {
    _id: schema.Types.ObjectId,
    books: [String],
    name: String,
    admin: Boolean,
    cnp: Number,
    username: String,
    password: String,
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

const userModel = mongoose.model("user", User_schema, "Users");

getUser = function (input, filter) {
  return userModel
    .find(filter)
    .skip((input.pageNumber - 1) * 7)
    .limit(7)
    .sort({ name: 1 });
};

getUserTable = function (input, filter) {
  return userModel.find(filter).sort({ name: 1 });
};

getUserFree = function (input, filter) {
  return userModel
    .find(filter)
    .skip((input.pageNumber - 1) * 7)
    .limit(7)
    .sort({ name: 1 });
};

postAdmin = function (body) {
  return userModel.findOne(body);
};

getUserCount = function (input, filter) {
  return userModel.find(filter).count();
};

getUserById = function (input) {
  if (mongoose.Types.ObjectId(input)) {
    return userModel.findById(input).select({ name: 1, cnp: 1 });
  }
};

addUser = function (body) {
  body["_id"] = new mongoose.Types.ObjectId();
  body["books"] = [];
  body["admin"] = false;
  return userModel.create(body);
};

editUser = function (id, body) {
  return userModel.updateOne({ _id: id }, body).exec();
};

editUserBook = async function (id, bookName) {
  var bookList = await userModel.findById(id).map((x) => {
    return x.books;
  });
  bookList[bookList.length++] = bookName;
  return userModel.updateOne({ _id: id }, { books: bookList }).exec();
};

deleteUser = function (id, body) {
  return userModel.deleteOne({ _id: id }).exec();
};

deleteUserBook = async function (id, bookName) {
  var bookList = await userModel.findById(id).map((x) => {
    return x.books;
  });
  bookList.splice(bookList.indexOf(bookName), 1);
  return userModel.updateOne({ _id: id }, { books: bookList }).exec();
};

module.exports = {
  addUser,
  getUser,
  getUserTable,
  getUserFree,
  getUserCount,
  getUserById,
  editUser,
  editUserBook,
  deleteUser,
  deleteUserBook,
  postAdmin,
};
