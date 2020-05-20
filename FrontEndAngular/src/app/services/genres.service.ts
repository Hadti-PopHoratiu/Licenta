import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  constructor(private http:HttpClient) { }

  getGenres(){
    return this.http.get(`http://localhost:4201/genres`);
  }
}
