import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../user.service';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  searchText : string;
  userId : any;
  items : any;
  check : boolean = false;
  constructor(private homeComponent : HomeComponent, private router : Router, private userService : UserService) { }

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

  deleteProductData(data : any) {
    console.log(data);
    const productData = {
      productname : data.productname
    }
    this.userService.deleteCartData(productData).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  } 
  
  ngOnInit(): void {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.userId = data[0].email;
      const userdata = {
        email : data[0].email
      }
      this.userService.getCartData(userdata).subscribe(data => {
        this.items = data;
        if(this.items.length > 0) {
          this.check = true;
        } 
        else {
          this.check = false;
        }
      })
      
    })
    
    
    //console.log(this.items);
    this.homeComponent.getCartData().subscribe(data => {
      this.items = data;
      console.log(this.items);
    })
  }

}
