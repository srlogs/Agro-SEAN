import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  getService(): Observable<any> {
    return this.http.get(
      "http://localhost:3000/api/users"
    ).pipe(
      catchError(err => {
        console.log(err)
        return err
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get("http://localhost:3000/api/users");
  }

  registerUser(newUser) :Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/register', newUser, { responseType : 'text'});
  }

  authenticateUser(userdata) : Observable<any> {
    return this.http.post('http://localhost:3000/api/user/authenticate', userdata);
  }

}
