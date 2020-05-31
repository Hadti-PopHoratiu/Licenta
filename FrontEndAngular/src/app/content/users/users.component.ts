import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  add = false;
  edit = false;
  href: string = "";
  book = true;
  users;
  pageNr: number = 1;
  totalNr: number;
  message: string = "";
  constructor(private router: Router, private user: UsersService) {}

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href === "/table") this.book = false;
    else {
      this.book = true;
    }

    this.getUserData();
  }

  receiveMessage($event) {
    this.message = $event;
    this.pageNr = 1;
    this.getUserData();
  }

  addToggle() {
    this.add = !this.add;
    this.edit = false;
  }

  editToggle() {
    this.edit = true;
    this.add = false;
  }

  delete() {}

  getPageInfo(nr: number) {
    this.pageNr = nr;
    this.getUserData();
  }

  getUserData() {
    this.user.getUsers(this.pageNr, this.message).subscribe((response) => {
      this.users = response;
      this.totalNr = 0;
      if (Object.keys(response).length) {
        this.totalNr = response[0].total;
        console.log(this.totalNr);
      }
    });
  }

  deleteUser(id) {
    this.user.deleteUser(id).subscribe(
      (res) => {
        this.getUserData();
      },
      (err) => {}
    );
  }
}
