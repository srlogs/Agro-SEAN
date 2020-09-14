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

}
