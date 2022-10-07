import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

const APIURL = environment.APIURLHost;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    // Register User
    createUser(data: User): Observable<[boolean, User]> {
      return new Observable<[boolean, User]>((observer) => {
  
        this.http.post(APIURL + '/user/register', data, httpOptions).subscribe(
          (response: any) => {
            
            let data = response;
            observer.next([true, data]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.error.message]);
            observer.complete();
          })
      });
    }



    userlogin(data: User): Observable<[boolean, User]> {
      let user: any = {
        email: data.email,
        password: data.password
      }
      return new Observable<[boolean, User]>((observer) => {
        this.http
          .post(
            APIURL + '/user/login', user, httpOptions
          )
          .subscribe(
            (response: any) => {
              observer.next([true, response]);
              observer.complete();
            },
            (error) => {
              observer.next([false, error.error.message]);
              observer.complete();
            }
          );
      });
    }
}
