import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  
  apiUrl = 'http://localhost/TEST/';

  

  private user: BehaviorSubject<User> | any = new BehaviorSubject(null);
  public currentUser!: Observable<User>;

  constructor(
    private http: HttpClient
  ) { 
    const storageUser: any = localStorage.getItem('user');
    //console.log(storageUser== 'undefined');
    this.user = new BehaviorSubject<User>(JSON.parse(storageUser== 'undefined'? '{}': storageUser));
    this.currentUser = this.user.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}app/login/loginUser`, JSON.stringify({ username, password })).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.user.next(response.data.user);
          return true;
        }
        
        return false;
      }
    ));
  }

  logOut() {
    if (this['isLoggedIn']) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user.next(null);
    }
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  get token(): any {
    const token = JSON.parse(localStorage.getItem('')!);
    return token ? token : null;
  }

}


