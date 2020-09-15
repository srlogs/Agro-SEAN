import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule} from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items : any;
  searchText :string;
  constructor(private router : Router, private userService : UserService) { }

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
  fruitsFunction() {
    this.userService.getFruits().subscribe(data => {
      this.items = data;
    })
  }

  vegetablesFunction() {
    this.userService.getVegetables().subscribe(data => {
      this.items = data;
    })
  }
  productData() {
    if(this.searchText.length == 0) {
      this.userService.getProducts(localStorage.getItem('accessToken')).subscribe(data => {
        this.items = data;
      })
    }
    else {
      const data = {
        productname : this.searchText
      }
      this.userService.getSingleProduct(data).subscribe(data => {
        console.log(data);
        this.items = data;
      })
    } 
  }
  ngOnInit(): void {
    this.userService.getProducts(localStorage.getItem('accessToken')).subscribe(data => {
      console.log(data);
      this.items = data;
    })
  }

}
