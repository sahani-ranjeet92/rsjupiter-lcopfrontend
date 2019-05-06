import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../core/shared/services/user-management.service';
import {Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm = this.fb.group({
  userName: ['',Validators.required],
  password: ['',Validators.required]
});
  
  constructor(private fb: FormBuilder, private userService : UserManagementService) { }

  ngOnInit() {
  }

   onLoggedin(){
    console.log(this.userService);
  }

}
