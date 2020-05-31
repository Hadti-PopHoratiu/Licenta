import { Component, OnInit } from "@angular/core";
import { LoginService } from "./services/login.service";
import { UsersService } from "./services/users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "FrontEndAngular";
  name: string;
  password: string;
  loggedIn: boolean = false;

  constructor(private auth: LoginService, private user: UsersService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.password = localStorage.getItem("password");

    this.user.login({ username: this.name, password: this.password }).subscribe(
      (res) => {
        this.loggedIn = true;
        localStorage.setItem("logged", JSON.stringify(this.loggedIn));
        this.auth.setAuth();
      },
      (err) => {
        localStorage.setItem("logged", JSON.stringify(this.loggedIn));
        this.auth.setAuth();
      }
    );
  }
}
