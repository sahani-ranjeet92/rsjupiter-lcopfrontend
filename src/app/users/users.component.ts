import {SpinnerComponent} from '../common/spinner/spinner.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserManagementService } from '../core/shared/services/user-management.service';
import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap, map } from 'rxjs/internal/operators';
import { ElementRef, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableComponent } from '../common/table/table.component';
import { UserDetail,ValidationMessage } from '../core/shared/models';
import * as $ from 'jquery';
import 'bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('userTableComp') tableComp: TableComponent;
  @ViewChild('add_new_user_modal') add_new_user_modal: ElementRef;
  @ViewChild('update_channel_modal') update_channel_modal: ElementRef;
  @ViewChild('appspinner') spinner: SpinnerComponent;

  public addNewUserForm: FormGroup;
  public updateUserForm: FormGroup;

  constructor(private userService: UserManagementService, private chRef: ChangeDetectorRef, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loadUserList();
    this.initAddUserForm();
    this.initUpdateUserForm();
  }

  initAddUserForm() {
    this.addNewUserForm = this.fb.group({
      mobileno: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  initUpdateUserForm() {
    this.updateUserForm = this.fb.group({
      mobileno: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  fillUpdateUserForm(userDetail: UserDetail) {
    this.updateUserForm.setValue({
      mobileno: userDetail.mobileno,
      email: userDetail.email,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      gender: userDetail.gender,
      status: userDetail.status,
      dateOfBirth: userDetail.dateOfBirth
    });
  }

  loadUserList() {
    this.userService.getAllUserList().subscribe(res => {
      let user_list = [];
      if (res.status == 200) {
        user_list = res.data;
      } else {
        alert("server error: " + res.message);
      }
      this.chRef.detectChanges();
      this.tableComp.initalizeTable(user_list);

    }, error => {

    }, () => {

    });
  }

  openAddUserModal() {
    $(this.add_new_user_modal.nativeElement).modal('show');
  }

  openEditModal(userId) {
    $(this.update_channel_modal.nativeElement).modal('show');
  }

  openRemoveModal(userId) {
    console.log(userId);
    let body = { "id": userId };
    if (confirm('Are You Sure?')) {
      this.userService.removeUser(body).subscribe(res => {
        this.spinner.loading = true;
        if (res.status == 200) {
          this.tableComp.destroyTable();
          this.loadUserList();
        } else {
          alert(res.message);
        }
      }, error => {
        alert(ValidationMessage.SOMETHING_WENT_WRONG);
      }, () => {
        this.spinner.loading = false;
      });
    }
  }

  addNewUser(){

  }

  updateUser(){
    
  }

}
