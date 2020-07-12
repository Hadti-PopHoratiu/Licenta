import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.css"],
})
export class UserAddComponent implements OnInit {
  constructor(private user: UsersService, private router: Router) {}

  ngOnInit(): void {}

  submit(form) {
    this.user.addUser(form.value).subscribe(
      (res) => {
        this.router.navigate(["../../../users"]);
      },
      (err) => {}
    );
  }
}
