import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  loggedIn: boolean;

  constructor(public auth: LoginService) { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("logged"));
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout(){
    localStorage.clear();
    this.auth.setAuth();
  }
}
