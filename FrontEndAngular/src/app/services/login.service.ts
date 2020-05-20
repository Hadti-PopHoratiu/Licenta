import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  constructor() { 
    this.loggedIn = JSON.parse(localStorage.getItem("logged"));
  }

  setAuth(){
    this.loggedIn = JSON.parse(localStorage.getItem("logged"));
  }
}
