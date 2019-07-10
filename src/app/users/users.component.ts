import { SpinnerComponent } from '../common/spinner/spinner.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserManagementService } from '../core/shared/services/user-management.service';
import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap, map } from 'rxjs/internal/operators';
import { ElementRef, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableComponent } from '../common/table/table.component';
import { UserDetail, ValidationMessage } from '../core/shared/models';
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
  @ViewChild('update_channel_modal') update_user_modal: ElementRef;
  @ViewChild('appspinner') spinner: SpinnerComponent;

  public addNewUserForm: FormGroup;
  public updateUserForm: FormGroup;
  public loading: boolean = false;
  userId: any;

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
      mobileno: [''],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
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
    let body = { "userId": userId };
    this.userService.getUserDetail(body).subscribe(res => {
      if (res.status == 200) {
        this.fillUpdateUserForm(res.data);
        this.userId = userId;
        $(this.update_user_modal.nativeElement).modal('show');
      } else {
        alert(ValidationMessage.SOMETHING_WENT_WRONG);
      }
    }, error => {
      alert(ValidationMessage.SOMETHING_WENT_WRONG);
    }, () => {

    });
  }

  fillUpdateUserForm(userDetail: UserDetail) {
    this.updateUserForm.setValue({
      mobileno: userDetail.username,
      email: userDetail.email,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      gender: userDetail.gender,
      status: userDetail.status,
      dateOfBirth: userDetail.dateOfBirth
    });
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

  addNewUser() {
    console.log("add User");
    this.spinner.loading = true;
    let body = this.getFormData(this.addNewUserForm, false);
    this.userService.addNewUser(body).subscribe(res => {
      if (res.status == 200) {
        this.tableComp.destroyTable();
        this.loadUserList();
        $(this.add_new_user_modal.nativeElement).modal('hide');
      } else {
        alert(res.message);
      }
      this.spinner.loading = false;
    }, error => {
      alert(ValidationMessage.SOMETHING_WENT_WRONG);
      this.spinner.loading = false;
    }, () => {

    });
  }


  updateUser() {
    console.log("update user");
    if (!this.userId) {
      alert('Invalid Input [userId]');
      return;
    }
    this.spinner.loading = true;
    this.loading = true;
    let body = this.getFormData(this.updateUserForm, true);
    body.userId = this.userId;
    this.userService.updateUser(body).subscribe(res => {
      if (res.status == 200) {
        this.tableComp.destroyTable();
        this.loadUserList();
        $(this.update_user_modal.nativeElement).modal('hide');
      } else {
        alert(res.message);
      }
      this.spinner.loading = false;
      this.loading = false;
    }, error => {
      this.getErrorMessage(error);
      this.spinner.loading = false;
      this.loading = false;
    }, () => {

    });
  }

  getFormData(form: FormGroup, isEdit: boolean) {
    let userDetail: UserDetail = new UserDetail();
    if (!isEdit) {
      userDetail.username = form.get('mobileno').value;
    }
    userDetail.email = form.get('email').value;
    userDetail.firstName = form.get('firstName').value;
    userDetail.lastName = form.get('lastName').value;
    userDetail.gender = form.get('gender').value;
    console.log(form.get('dateOfBirth').value);
    userDetail.dateOfBirth = form.get('dateOfBirth').value;
    return userDetail;
  }

  getErrorMessage(error) {
    let msg = ValidationMessage.SOMETHING_WENT_WRONG;
    if (error.message) {
      msg = msg + ' : ' + error.message
    }
    return msg;
  }

  get mobileno() {
    return this.addNewUserForm.get('mobileno');
  }

  get email() {
    return this.addNewUserForm.get('email');
  }

  get firstName() {
    return this.addNewUserForm.get('firstName');
  }

  get lastName() {
    return this.addNewUserForm.get('lastName');
  }

  get gender() {
    return this.addNewUserForm.get('gender');
  }

  get dob() {
    return this.addNewUserForm.get('dateOfBirth');
  }


  get email1() {
    return this.updateUserForm.get('email');
  }

  get firstName1() {
    return this.updateUserForm.get('firstName');
  }

  get lastName1() {
    return this.updateUserForm.get('lastName');
  }

  get gender1() {
    return this.updateUserForm.get('gender');
  }

  get dob1() {
    return this.updateUserForm.get('dateOfBirth');
  }

}
