import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../user.service';
@Component({
  selector: 'app-buyer-page',
  templateUrl: './buyer-page.component.html',
  styleUrls: ['./buyer-page.component.css']
})
export class BuyerPageComponent implements OnInit {
  buyButtonData : any;
  productName : string;
  userData : any;
  location : string;
  sellerProducts : string;
  userId : string;
  items : any;
  productCount : any;
  product : any;
  searchText : string; 
  seller : any;
  constructor(private userService : UserService, private homeComponent : HomeComponent, private router : Router) { }
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

  buyProduct(data :any) {
    console.log(data);
  }

  ngOnInit(): void {
    this.homeComponent.getBuyData().subscribe(data => {
      this.buyButtonData = data;
      //console.log(this.buyButtonData);
    })
    //console.log(localStorage.getItem('productName'));
    const productName = {
      productname : localStorage.getItem('productName')
    }
    this.userService.getSingleProduct(productName).subscribe(data => {
      this.productName = data[0].productname;
      this.location = data[0].name;
      this.product = data;
      //console.log(this.location);
    })
    this.userService.getSellerProduct(productName).subscribe(data => {
      this.sellerProducts = data;
      this.seller = [];
      for(var i = 0; i < data.length; ++i) {
        const sellerEmail = {
          email : data[i].email
        }
        this.userService.getUserData(sellerEmail).subscribe(data => {
          var length = this.seller.push(data);
          console.log(this.seller);
        })
      }
      console.log(this.sellerProducts);
    })
    
    
  }
}
