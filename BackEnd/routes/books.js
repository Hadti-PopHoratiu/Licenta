const express = require("express");
const router = express.Router();
const book = require("../model/book");

router.get("/", async function (req, res, next) {
  let query = req.query;
  let filter = {};

  if (req.query && req.query.book == "true") {
    filter["name"] = new RegExp(req.query.search, "i");
  } else if (req.query && req.query.author == "true") {
    filter["author"] = new RegExp(req.query.search, "i");
  }

  if (req.query && req.query.genre) {
    filter["genre"] = req.query.genre.replace(/ /g, "").split(",");
  }
  let books = await book.getBook(query, filter);
  if (!books && null === books) {
    return res.status(500).send({ message: "internal error" });
  }

  let bookCount = await book.getBookCount(query, filter);
  return res.json(
    books.map((result) => {
      return {
        id: result._id,
        name: result.name,
        author: result.author,
        date: result.date,
        genre: result.genre,
        free: result.total - result.used,
        total: result.total,
        used: result.used,
        image: result.image,
        count: bookCount,
        isbn: result.isbn,
      };
    })
  );
});

router.get("/:id", async function (req, res, next) {
  let bookData = await book.getBookById(req.params.id);

  if (!bookData && null === bookData) {
    return res.status(500).send({ message: "internal error" });
  }

  return res.json({
    id: bookData._id,
    name: bookData.name,
    author: bookData.author,
    date: bookData.date,
    genre: bookData.genre,
    total: bookData.total,
    isbn: bookData.isbn,
    free: bookData.total - bookData.used,
    description: bookData.description,
    image: bookData.image,
  });
});

router.post("/", async function (req, res, next) {
  await book
    .addBook(req.body)

    .then((result) => {
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost adaugat cu succes" });
    })
    .catch((error) => {
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.put("/:id/bookCountUp", async function (req, res, next) {
  await book
    .editBookUsedCountUp(req.params.id)
    .then((result) => {
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost modificat cu succes" });
    })
    .catch((error) => {
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.put("/:id/bookCountDown", async function (req, res, next) {
  await book
    .editBookUsedCountDown(req.params.id)

    .then((result) => {
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost modificat cu succes" });
    })
    .catch((error) => {
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.put("/:id", async function (req, res, next) {
  await book
    .editBook(req.params.id, req.body)

    .then((result) => {
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost modificat cu succes" });
    })
    .catch((error) => {
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.delete("/:id", async function (req, res, next) {
  await book
    .deleteBook(req.params.id)

    .then((result) => {
      return res.status(200).json({ message: "Cartea a fost sters cu succes" });
    })
    .catch((error) => {
      return res.status(417).json({ message: "Date incorecte" });
    });
});

module.exports = router;
