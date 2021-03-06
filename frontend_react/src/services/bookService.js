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

export function editBookById(id, body) {
  return fetch(`http://localhost:4201/books/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function editBookCountUp(id, body) {
  return fetch(`http://localhost:4201/books/${id}/bookCountUp`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function editBookCountDown(id, body) {
  return fetch(`http://localhost:4201/books/${id}/bookCountDown`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function deleteBook(id) {
  return fetch(`http://localhost:4201/books/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
