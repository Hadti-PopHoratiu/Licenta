export function getBooks(pageNumber, filter, book, author, genre) {
  return fetch(
    `http://localhost:4201/books?pageNumber=${pageNumber}&search=${filter}&book=${book}&author=${author}&genre=${genre}`
  ).then((res) => res.json());
}

export function getBookById(id) {
  return fetch(`http://localhost:4201/books/${id}`).then((res) => res.json());
}

export function addBook(body) {
  return fetch("http://localhost:4201/books", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
