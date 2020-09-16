import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SellProductComponent } from '../sell-product/sell-product.component';
import { UserService } from '../user.service';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {
  
  constructor(private sellproduct : SellProductComponent, private userService : UserService, private router : Router) { }
  productName : any;
  item : any;
  items: any;
  searchText : string;
  quantity: string;
  price: string;
  latitude: string;
  longitude: string;
  myAccountFunction() {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
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
        //  Items stores the user details : email
        this.items = data;
      })
    }
    else {
      const data = {
        productname : this.searchText
      }
      this.userService.getSingleProduct(data).subscribe(data => {
        this.items = data;
      })
    } 
  }
  sellProduct() {
    this.userService.getLocation().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lon;
      const productData = {
        email : this.items[0].email,
        productName : this.item[0].productname,
        location : this.item[0].name,
        category : this.item[0].category,
        quantity : this.quantity,
        price : this.price,
        latitude : this.latitude,
        longitude : this.longitude
      }
      console.log(productData);
      this.userService.postSellerData(productData).subscribe(data => {
        console.log(data);
      })
    })
    this.router.navigate(['/product-list']);
  }
  ngOnInit(): void {
    this.productName = localStorage.getItem('productName');
    const data = {
      productname : this.productName
    }
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      //  Items stores the user details : email
      this.items = data;
    })
    this.userService.getSingleProduct(data).subscribe(data => {
      //  Item stores the product data : product name, product location
      this.item = data;
    })
  }

}
