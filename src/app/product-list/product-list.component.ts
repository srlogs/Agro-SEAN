import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchText : string;
  items : any;
  product : any;
  userdata : any;
  combinedData : any;
  checkList1 : boolean = false;
  constructor(private userService : UserService, private router : Router) { }
  myAccountFunction() {
    //  To get user data
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
        console.log(data);
        this.items = data;
      })
    } 
  }
  ngOnInit(): void {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      this.userdata = data;
      const useremail = {
        email : this.userdata[0].email
      }
      this.userService.getSellerData(useremail).subscribe(data => {
        this.items = data;
        console.log(this.items);
        if(this.items.length > 0)
          this.checkList1 = true;
        else 
          this.checkList1 = false;
      })
    })
  }

}
