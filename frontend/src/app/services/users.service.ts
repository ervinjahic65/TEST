import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '../models/user';
import { BASE_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  [x: string]: any;

  apiUrl: string ;

  private getUsersUrl: string = BASE_URL + 'app/login/getUsers';
  private updateUsersUrl: string = BASE_URL + 'app/dashboard/getUpdateUsers';

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.baseUrl;
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.apiUrl}app/login/getUsers`).pipe(
      map((response: any) => response.data)
    );
  }

  addUser(user: User) {
    return this.http.post(`${this.apiUrl}app/dashboard/addUser`, JSON.stringify({ user }));
  }

  getUpdateUsers(userId: number, user: User) {
    return this.http.post(`${this.apiUrl}app/dashboard/getUpdateUsers`, JSON.stringify ({ user, userId }));
  }

  deleteUser(userId: number) {
    return this.http.post(`${this.apiUrl}app/dashboard/deleteUser`, JSON.stringify({ userId }));
  }

  changePassword(userId: number, password: any) {
    return this.http.post(`${this.apiUrl}app/dashboard/changePassword`, JSON.stringify({ password, userId }));
  }

}



