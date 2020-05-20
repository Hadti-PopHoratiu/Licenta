const express = require("express");
const router = express.Router();
const user = require("../model/user");

router.get("/", async function (req, res, next) {
  let query = req.query;
  let filter = { admin: false };
  if (req.query && req.query.search) {
    filter["name"] = new RegExp(req.query.search, "i");
  }
  let users = await user.getUser(query, filter);
  if (!users && null === users) {
    return res.status(500).send({ message: "internal error" });
  }

  let userCount = await user.getUserCount(query, filter);
  if (!userCount) {
    userCount = 0;
  }
  console.log(users);
  return res.json(
    users.map((result) => ({
      id: result._id,
      name: result.name,
      cnp: result.cnp,
      books: result.books,
      total: userCount,
    }))
  );
});

router.get("/table", async function (req, res, next) {
  let query = req.query;
  let filter = { admin: false };

  if (req.query && req.query.book) {
    filter["books"] = req.query.book;
  }
  let users = await user.getUserTable(query, filter);
  if (!users && null === users) {
    return res.status(500).send({ message: "internal error" });
  }

  console.log(users);
  return res.json(
    users.map((result) => {
      return { id: result._id, name: result.name, cnp: result.cnp };
    })
  );
});

router.get("/free", async function (req, res, next) {
  let query = req.query;
  let filter = { admin: false };
  if (req.query && req.query.search) {
    filter["name"] = new RegExp(req.query.search, "i");
  }

  if (req.query && req.query.book) {
    filter["books"] = { $not: new RegExp(req.query.book, "i") };
  }

  let users = await user.getUser(query, filter);
  if (!users && null === users) {
    return res.status(500).send({ message: "internal error" });
  }

  let userCount = await user.getUserCount(query, filter);

  console.log(users);
  return res.json(
    users.map((result) => {
      return {
        id: result._id,
        name: result.name,
        cnp: result.cnp,
        books: result.books,
        total: userCount,
      };
    })
  );
});

router.get("/:id", async function (req, res, next) {
  let userData = await user.getUserById(req.params.id);
  console.log(req.params.id);
  console.log(userData);

  if (!userData && null === userData) {
    return res.status(500).send({ message: "internal error" });
  }
  console.log(userData);
  return res.json({ id: userData._id, name: userData.name, cnp: userData.cnp });
});

router.post("/", async function (req, res, next) {
  console.log(req.body);
  await user
    .addUser(req.body)

    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost adaugat cu succes" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.post("/login", async function (req, res, next) {
  console.log(req.body);
  await user
    .postAdmin(req.body)

    .then((result) => {
      console.log(result);
      if (result) {
        return res.status(200).json({ message: "Te-ai conectat cu succes" });
      } else {
        return res.status(401).json({ message: "Date false" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.put("/:id/book", async function (req, res, next) {
  console.log(req.body.book);
  await user
    .editUserBook(req.params.id, req.body.book)

    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost modificat cu succes" });
    })
    .catch((error) => {
      console.log("eroare aci");
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.put("/:id", async function (req, res, next) {
  await user
    .editUser(req.params.id, req.body)

    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost modificat cu succes" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.delete("/:id/book", async function (req, res, next) {
  await user
    .deleteUserBook(req.params.id, req.body.book)

    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost sters cu succes" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(417).json({ message: "Date incorecte" });
    });
});

router.delete("/:id", async function (req, res, next) {
  await user
    .deleteUser(req.params.id)

    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Utilizatorul a fost sters cu succes" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(417).json({ message: "Date incorecte" });
    });
});

module.exports = router;
