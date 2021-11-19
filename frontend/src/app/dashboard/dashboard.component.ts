import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

import { User } from '../models/user'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tab = 'profile';

  users: Observable<User[]> | undefined;
  currentUser: Observable<User> | undefined;
  selectedUser: Observable<User> | undefined;

  addNewUserForm!: FormGroup;
  editUserForm!: FormGroup;
  editPasswordForm!: FormGroup;

  showWarningModal = false;
  idToDelete: number | any;
  toastr: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService   
  ) { }

  ngOnInit(): void {

    this.editUserForm = this.formBuilder.group({
      username: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      address: [''],
      postcode: [''],
      city: ['']
    });

    this.addNewUserForm = this.formBuilder.group({
      username: [''],
      password: [''],
      passwordConfirm: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      address: [''],
      postcode: [''],
      city: ['']
    });

    this.editPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordNew: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    });

    this.selectedUser = this.route.data.pipe(
      map((data: any) => {
        this.editUserForm?.patchValue(data.users[0]);
        return data.users[0];
      })
    );

    this.users = this.route.data.pipe(
      map((data: any) => data.users)
    );
    this.currentUser = this.authService['currentUser'];
  }

  selectUser(user: User) {
    this.selectedUser = of(user);
    this.editUserForm?.patchValue(user);
    this.tab = 'edit';
  }

  update({ value, valid }: { value: User, valid: boolean }, userId: number) {
    if(valid) {
      this.usersService['getUpdateUsers'](userId, value).subscribe(
        (response: any) => {
          if(response.data) {
            this.selectUser(response.data);
            this.users = this.usersService['getUsers']();
            this.editUserForm?.reset();
            //this.toastr.success('User has been updated successfully.');
          }
        }
      );
    }
  }

  add({ value, valid }: { value: User, valid: boolean }) {
    if(valid) {
      this.usersService['addUser'](value).subscribe(
        (response: any) => {
          //console.log(response);
          this.users = this.usersService['getUsers']().pipe(
            map((resp: any) => {
              this.selectUser(
                resp.sort((a: any, b: any) => a.id - b.id)[resp.length - 1]
              );
              this.addNewUserForm?.reset();
              //this.toastr.success('New user has been added successfully.');
              return resp;
            })
          );
        }
      );
    }
  }

  updatePassword({ value, valid }: { value: any, valid: boolean }, userId: number) {
    if(valid) {
      this.usersService['changePassword'](userId, value)
      .subscribe(
        //response => this.toastr.success('Your password has been updated successfully.')
      );
      this.editPasswordForm?.reset();
    }
  }

  toggleWarning(id?:number) {
    this.showWarningModal = !this.showWarningModal;
    this.idToDelete = id;
  }

  delete() {
    //this.toggleWarning();
    this.usersService['deleteUser'](this.idToDelete).subscribe(
      (response: any) => {
        //console.log(response);
        //this.toastr.success('User has been deleted successfully.');
        this.toggleWarning();
        this.users = this.usersService['getUsers']();
        this.addNewUserForm?.reset();
      }
    );
  }

  logOut() {
    this.authService['logOut']();
    this.router.navigate(['login']);
  }

}
