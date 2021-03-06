import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http : HttpClient) { }


  registerUser(newUser) :Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/register', newUser, { responseType : 'text'});
  }

  authenticateUser(userdata) : Observable<any> {
    return this.http.post('http://localhost:3000/api/user/authenticate', userdata);
  }

  getUserId(token) :Observable<any> {
    const headerValues = {
      token : token
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.get('http://localhost:3000/api/auth', { headers : headers });
  }

  getProducts(token) :Observable<any> {
    const headerValues = {
      token : token
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.get('http://localhost:3000/api/products', { headers : headers});
  }

  storePersonalData(userdata) :Observable<any> {
    return this.http.post('http://localhost:3000/api/user/personalinfo', userdata);
  }

  getFruits() : Observable<any> {
    return this.http.get('http://localhost:3000/api/fruits');
  }

  getVegetables() : Observable<any> {
    return this.http.get('http://localhost:3000/api/vegetables');
  }

  getSingleProduct(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/fruit/name', data, {headers: headers});
  }

  getCartData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/getcart/', data, {headers: headers});
  }

  deleteCartData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/deletecart', data, { headers: headers});
  }

  getCartProductCount(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/cartdata/count', data, { headers: headers});
  }

  storeCartData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/cartdata', data, { headers: headers});
  }

  //  Storing seller product data
  postSellerData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/seller', data, { headers: headers});
  }
 
  //  Getting seller product data
  getSellerProduct(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/sellerproduct', data, { headers: headers});
  }

  //  Updating status of the seller product data
  updateSellerStatus(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/seller/status', data, { headers: headers});
  }
  
  getUserData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/get/userdata', data, { headers: headers});
  }

  getSellerData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/seller/data', data, { headers: headers});
  }

  getPersonalInfo(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/personaldata', data, {headers: headers});
  }

  updatePersonalInfo(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/personalinfo/update', data, {headers: headers});
  }

  getProductCount(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/seller/count', data, { headers: headers});
  }

  storeBuyProductData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/buy', data, { headers: headers});
  }

  //  Buyer order list
  getBuyProductData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/orderlist', data, { headers: headers});
  }

  //  Seller order list
  getSellerList(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/sellerlist', data, { headers: headers})
  }

  //  Deleting seller product after completion of the transaction
  removeSellerData(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/delete/product', data, { headers: headers});
  }

  //  sending email as product receipt
  sendReceipt(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/receipt', data, { headers: headers});
  }

  //  Accept and reject orders
  orderAcceptance(data) : Observable<any> {
    const headerValues = {
      "Content-type" : "application/json",
      "responseType" : "text"
    }
    var headers = new HttpHeaders(headerValues);
    return this.http.post('http://localhost:3000/api/user/order/accept', data, { headers: headers});
  }

  getLocation() : Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lat : resp.coords.latitude, lon : resp.coords.longitude});
      },
      err => {
        reject(err);
      });
    });
  }

}
