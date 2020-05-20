export function getGenres(pageNumber, filter) {
  return fetch(`http://localhost:4201/genres`).then((res) => res.json());
}
