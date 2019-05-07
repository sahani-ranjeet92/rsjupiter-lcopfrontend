import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../core/shared/services/user-management.service';
import {Validators, FormBuilder} from '@angular/forms';
import { AuthUser,ValidationMessage } from '../core/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: String;
  authUser: AuthUser = new AuthUser();

loginForm = this.fb.group({
  userName: ['',Validators.required],
  password: ['',Validators.required]
});
  
  constructor(private router: Router,private fb: FormBuilder, private userService : UserManagementService) { }

  ngOnInit() {
  }

  onLoggedin(){
    console.log(this.userService);
    this.message = '';
    this.authUser.userName = this.loginForm.value.userName;
    this.authUser.password = this.loginForm.value.password;
    this.userService.logIn(this.authUser).subscribe( res => {
      this.router.navigate(['']);
    }, error => {
      if (error.status === 401) {
        this.message = ValidationMessage.INVALID_CREDENTIALS;
      }
      console.log(error);
    });
  }

}
