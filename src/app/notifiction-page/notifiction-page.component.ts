import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule} from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notifiction-page',
  templateUrl: './notifiction-page.component.html',
  styleUrls: ['./notifiction-page.component.css']
})
export class NotifictionPageComponent implements OnInit {
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

  acceptButton(productdata : any) {
    const accept = {
      status : "2",
      email : this.userId,
      quantity : productdata.quantity,
      price : productdata.price
    }
    this.userService.orderAcceptance(accept).subscribe(data => {
      console.log(data);
    })
    console.log(productdata);
    const removeProduct = {
      email : this.userId,
      productName : productdata.productname,
      quantity : productdata.quantity,
      price : productdata.price
    }
    // //  Removing after accepting the product
    // this.userService.removeSellerData(removeProduct).subscribe(data => {
    //   console.log(data);
    // })

    //  updating sellerdata status 
    this.userService.updateSellerStatus(accept).subscribe(data => {
      console.log(data);
    })
    this.reloadFunction();
  }

  rejectButton() {
    const reject = {
      status : "3",
      email : this.userId
    }
    this.userService.orderAcceptance(reject).subscribe(data => {
      console.log(data);
    })
    this.reloadFunction();
  }

  reloadFunction() {
    const userEmail = {
      email : this.userId
    }
    this.userService.getSellerList(userEmail).subscribe(data => {
      this.items = data;
      //console.log(this.items);
    })
  }
  
  ngOnInit(): void {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.userId = data[0].email;
      const userEmail = {
        email : this.userId
      }
      this.userService.getSellerList(userEmail).subscribe(data => {
        this.items = data;
        //console.log(this.items);
      })
    })
  }

}
