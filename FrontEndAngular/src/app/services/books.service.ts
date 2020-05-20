import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http:HttpClient) { }

  getBooks(pageNumber, filter, book, author, genre){
    return this.http.get(`http://localhost:4201/books?pageNumber=${pageNumber}&search=${filter}&book=${book}&author=${author}&genre=${genre}`);
  }

  getBookById(id){
    return this.http.get(`http://localhost:4201/books/${id}`);
  }

  addBook(body){
    return this.http.post("http://localhost:4201/books", body);
  }

  editBookById(id, body){
    return this.http.put(`http://localhost:4201/books/${id}`, body);
  }

  editBookCountUp(id, body){
    return this.http.put(`http://localhost:4201/books/${id}/bookCountUp`, body);
  }

  editBookCountDown(id, body){
    return this.http.put(`http://localhost:4201/books/${id}/bookCountDown`, body);
  }

  deleteBook(id){
    return this.http.delete(`http://localhost:4201/books/${id}`);
  }
}
