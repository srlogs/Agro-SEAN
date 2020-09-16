import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, Routes, RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username : string;
  email : string;
  phone : string;
  doorno : string;
  street : string;
  district : string;
  name : string;
  users : any;
  check : boolean = false;
  constructor(private userService : UserService, private router : Router) { }
  myAccountFunction() {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      console.log(data);
      if(data.length > 0) {
        this.router.navigate(['/account']);
      }
      else {
        this.router.navigate(['/']);
      }
    })
  }
  homeFunction() {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      console.log(data);
      if(data.length > 0) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/']);
      }
    })
  }
  LogoutFunction() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  sellProductFunction() {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      console.log(data);
      if(data.length > 0) {
        this.router.navigate(['/sell-product']);
      }
      else {
        this.router.navigate(['/']);
      }
    })
  }
  personalInfo() {
    const userdata = {
      email : this.email,
      mobile : this.phone,
      doorno : this.doorno,
      street : this.street,
      district : this.district
    }
    if(!this.check) {
      this.userService.storePersonalData(userdata).subscribe(data => {
        console.log(data);
        this.router.navigate(['/account']);
      })
    }
    else {
      this.userService.updatePersonalInfo(userdata).subscribe(data => {
        console.log(data);
        this.router.navigate(['/account']);
      })
    }
  }

  ngOnInit(): void {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.username = data[0].username;
      this.name = data[0].username;
      this.email = data[0].email;
      const userdata = {
        email : this.email
      }
      this.userService.getPersonalInfo(userdata).subscribe(data => {
        this.users = data;
        if(this.users.length > 0) {
          this.check = true;
          this.street = data[0].street;
          this.doorno = data[0].doorno;
          this.district = data[0].district;
          this.phone = data[0].mobile;
        } 
        else {
          this.check = false;
        }
      })
    })
  }

}
