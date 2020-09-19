import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule} from '@angular/router';
import { UserService } from '../user.service';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items : any;
  searchText :string;
  productCount : number[];
  userId : string;
  dT : string;
  private subject = new Subject<any>();
  private buy = new Subject<any>();
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
  fruitsFunction() {
    this.userService.getFruits().subscribe(data => {
      this.items = data;
      this.productCount = [];
      for(var i = 0; i < this.items.length; ++i) {
        const productName = {
          productname : this.items[i].productname
        }
        this.userService.getProductCount(productName).subscribe(data => {
          var length = this.productCount.push(data);
        })
      }
    })
  }

  vegetablesFunction() {
    this.userService.getVegetables().subscribe(data => {
      this.items = data;
      console.log(this.items);
      this.productCount = [];
      for(var i = 0; i < this.items.length; ++i) {
        const productName = {
          productname : this.items[i].productname
        }
        this.userService.getProductCount(productName).subscribe(data => {
          var length = this.productCount.push(data);
        })
      }
    })
  }
  productData() {
    if(this.searchText.length == 0) {
      this.userService.getProducts(localStorage.getItem('accessToken')).subscribe(data => {
        this.items = data;
        this.productCount = [];
        for(var i = 0; i < this.items.length; ++i) {
          const productName = {
            productname : this.items[i].productname
          }
          this.userService.getProductCount(productName).subscribe(data => {
            var length = this.productCount.push(data);
          })
        }
      })
    }
    else {
      const data = {
        productname : this.searchText
      }
      this.userService.getSingleProduct(data).subscribe(data => {
        //console.log(data);
        this.items = data;
        this.productCount = [];
      for(var i = 0; i < this.items.length; ++i) {
        const productName = {
          productname : this.items[i].productname
        }
        this.userService.getProductCount(productName).subscribe(data => {
          var length = this.productCount.push(data);
        })
      }
      })
    } 
  }

  cartFunction(data :any ) {
    //console.log(data);
    this.subject.next(data);
    const productCountData = {
      productname : data.productname
    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let dateTime = new Date();
    this.dT = dateTime.getDate().toString() +" "+ monthNames[dateTime.getMonth()] +" "+ dateTime.getFullYear().toString();
    const cartData = {
      email : this.userId,
      productname : data.productname,
      location : data.name,
      category : data.category, 
      time : this.dT
    }
    this.userService.storeCartData(cartData).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['/cart-view']);
  }

  getCartData() : Observable <any> {
    return this.subject.asObservable();
  }

  buyButtonData(data : any) {
    this.buy.next(data);
    localStorage.setItem('productName', data.productname);
    this.router.navigate(['/buyer-page']);
  } 

  getBuyData() : Observable<any> {
    return this.buy.asObservable();
  }

  ngOnInit(): void {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.userId = data[0].email;
      this.userService.getProducts(localStorage.getItem('accessToken')).subscribe(data => {
        //console.log(data);
        //  Products data
        this.items = data;
        //  product count
        this.productCount = [];
        for(var i = 0; i < this.items.length; ++i) {
          const productName = {
            productname : this.items[i].productname,
            email : this.userId
          }
          this.userService.getProductCount(productName).subscribe(data => {
            var length = this.productCount.push(data);
          })
        }
      })
    })
    
  }

}
