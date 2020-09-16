import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http'; 

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {

  items : any;
  product : any;
  searchText : string;
  val : any;
  constructor(private userService : UserService, private router : Router) { }
  myAccountFunction() {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      //console.log(data);
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
        //console.log(data);
        this.items = data;
      })
    } 
  }
  ngOnInit(): void {
    this.userService.getProducts(localStorage.getItem('accessToken')).subscribe(data => {
      //console.log(data);
      this.items = data;
    })
  }
  sell(data) {
    this.val = data;
    localStorage.setItem('productName', data.productname);
    //console.log(this.getData());
    this.router.navigate(['/seller-page']);
  }
  

}
