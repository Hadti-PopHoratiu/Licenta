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
