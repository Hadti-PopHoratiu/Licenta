import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name: string;
  public password: string;
  constructor(private router: Router, private user: UsersService, private auth:LoginService) { }

  ngOnInit(): void {
    this.name = 'cucuc';
    this.password = 'micii';
  }

  submit(form){
    localStorage.setItem('name', form.value.name);
    localStorage.setItem('password', form.value.password);
    this.user.login({username: form.value.name, password: form.value.password}).subscribe(
      res=>{ 
        console.log(res);
        localStorage.setItem('logged', JSON.stringify(true));
        this.auth.setAuth();
        this.router.navigate(['']);
      },
      err=>{console.log(err)}
    )
  }
}
