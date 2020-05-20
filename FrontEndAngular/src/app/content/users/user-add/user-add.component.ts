import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Output() refreshEvent = new EventEmitter<string>();
  constructor(private user: UsersService) { }

  refresh;
  ngOnInit(): void {
  }

  sendRefresh() {
    this.refreshEvent.emit(this.refresh)
  }

  submit(form){
    this.user.addUser(form.value).subscribe(
      res=>{ this.sendRefresh()},
      err=>{ console.log(err)}
    )
  }
}
