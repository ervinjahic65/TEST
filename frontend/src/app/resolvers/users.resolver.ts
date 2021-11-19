import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from './../services/users.service';

@Injectable()
export class UsersResolver implements Resolve<any> {
  constructor(private usersService: UsersService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any> {
    return this.usersService['getUsers']();
  }
}
