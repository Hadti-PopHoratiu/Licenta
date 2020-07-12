import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  name = "hari";
  data;
  cnp;
  userId;
  constructor(
    private user: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params["id"];
    });

    this.user.getUserById(this.userId).subscribe((response) => {
      this.data = response;
      this.name = this.data.name;
      this.cnp = this.data.cnp;
    });
  }
  submit(form) {
    this.name = form.value.name;
    this.cnp = form.value.cnp;
    this.user
      .editUserById({ name: this.name, cnp: this.cnp }, this.userId)
      .subscribe(
        (res) => {
          this.router.navigate(["../../../users"]);
        },
        (err) => {}
      );
  }
}
