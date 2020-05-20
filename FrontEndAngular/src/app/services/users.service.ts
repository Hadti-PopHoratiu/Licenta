import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }

  getUsers(pageNumber, filter){
    return this.http.get(`http://localhost:4201/users?pageNumber=${pageNumber}&search=${filter}`);
  }

  getUserTable(book){
    return this.http.get(`http://localhost:4201/users/table?&book=${book}`);
  }

  getUserFree(pageNumber, filter, book){
    return this.http.get(`http://localhost:4201/users/free?pageNumber=${pageNumber}&search=${filter}&book=${book}`);
  }

  getUserById(id){
    return this.http.get(`http://localhost:4201/users/${id}`);
  }

  addUser(body){
    return this.http.post("http://localhost:4201/users", body);
  }

  addUserBook(body, id){
    return this.http.put(`http://localhost:4201/users/${id}/book`, body);
  }

  editUserById(body, id){
    return this.http.put(`http://localhost:4201/users/${id}`, body);
  }

  login(body){
    return this.http.post(`http://localhost:4201/users/login`, body);
  }

  deleteUser(id){
    return this.http.delete(`http://localhost:4201/users/${id}`);
  }

  deleteUserBook(id, body){
    return this.http.delete(`http://localhost:4201/users/${id}/book`, body);
  }
}
