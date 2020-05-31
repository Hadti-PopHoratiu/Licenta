export function getUsers(pageNumber, filter) {
  return fetch(
    `http://localhost:4201/users?pageNumber=${pageNumber}&search=${filter}`
  ).then((res) => res.json());
}

export function getUserTable(book) {
  return fetch(`http://localhost:4201/users/table?&book=${book}`).then((res) =>
    res.json()
  );
}

export function getUserFree(pageNumber, filter, book) {
  return fetch(
    `http://localhost:4201/users/free?pageNumber=${pageNumber}&search=${filter}&book=${book}`
  ).then((res) => res.json());
}

export function getUserById(id) {
  return fetch(`http://localhost:4201/users/${id}`).then((res) => res.json());
}

export function editUserById(id, body) {
  return fetch(`http://localhost:4201/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function addUser(body) {
  return fetch("http://localhost:4201/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function addUserBook(body, id) {
  return fetch(`http://localhost:4201/users/${id}/book`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function deleteUserBook(body, id) {
  return fetch(`http://localhost:4201/users/${id}/book`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function deleteUser(id) {
  return fetch(`http://localhost:4201/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
