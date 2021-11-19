import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.authService.login(value.username, value.password).subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.router.navigateByUrl('/dashboard');
            console.log(this.router.navigateByUrl('/dashboard'));
          }
        }
      );
    }
  }

}


