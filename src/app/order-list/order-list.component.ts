import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule} from '@angular/router';
import { UserService } from '../user.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  userId : string;
  items : any;
  searchText : string;

  constructor(private router : Router, private userService : UserService) { }

  myAccountFunction() {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      //console.log(data);
      this.userId = data[0].email;
      if(data.length > 0) {
        this.router.navigate(['/account']);
      }
      else {
        this.router.navigate(['/']);
      }
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
        //console.log(data);
        this.items = data;
      })
    } 
  }

  ngOnInit(): void {
    //  Getting userdata
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.userId = data[0].email;
      const userEmail = {
        email : this.userId
      }
      //  getting order items
      this.userService.getBuyProductData(userEmail).subscribe(data => {
        this.items = data;
        console.log(this.items);
      })
    })
  }

}
