import { Component, OnInit } from '@angular/core';
import { UserData } from '../userData';
import { UserService } from '../user.service';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users : UserData[];
  user : UserData;
  username : string;
  email : string;
  password : string;

  constructor(private userService : UserService, private router : Router) { }
  
  
  addUserData() {
    const newUser = {
      username : this.username,
      email : this.email,
      password : this.password
    }
    this.userService.registerUser(newUser)
      .subscribe(data => {
        this.users = data;
        if(data == "OK") {
          console.log(data);
          this.router.navigate(['/']);
        }
      },
      err => console.log("error", err)
      )
  }

  ngOnInit(): void {
  }

}
