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
  check : boolean = false;
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

  buyProduct(buyerData :any) {
    console.log(buyerData);
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      //  Buyer email id
      this.userId = data[0].email;
      const buy = {
        sellerEmail : buyerData.email,
        buyerEmail : this.userId,
        productName : buyerData.productname,
        quantity : buyerData.quantity,
        price : buyerData.price,
        buyerStatus : "1",
        sellerStatus : "1"
      }
      this.userService.storeBuyProductData(buy).subscribe(data => {
        console.log(data);
      })
      //  Sending email
      this.userService.sendReceipt(buy).subscribe(data => {
        console.log(data);
      })
    })
    this.router.navigate(['/order-list']);
  }

  ngOnInit(): void {
    this.homeComponent.getBuyData().subscribe(data => {
      this.buyButtonData = data;
      //console.log(this.buyButtonData);
    })
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.userId = data[0].email;
      console.log(this.userId);
      const productName = {
        productname : localStorage.getItem('productName'),
        email : this.userId
      }
      this.userService.getSingleProduct(productName).subscribe(data => {
        this.productName = data[0].productname;
        this.location = data[0].name;
        this.product = data;
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
            if(this.sellerProducts.length > 0) {
              this.check = true;
            }
            else {
              this.check = false;
            }
          })
        }
      })
    })
  }
}
