import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string;
  password : string;
  invalid : boolean = false;
  constructor(private userService : UserService, private router : Router) { }
  authenticateData() {
    const userData = {
      email : this.email,
      password : this.password
    }
    console.log(userData);
    this.userService.authenticateUser(userData)
      .subscribe(data => {
        console.log(data);
        if(data.status == 200) {
          localStorage.setItem('accessToken', data.accesstoken);
          this.router.navigate(['/home']);
        }
        else if(data.status == 400) {
          this.invalid = true;
        }
      },
      err => { console.log("error", err)}
      )
  }
  ngOnInit(): void {
  }

}
