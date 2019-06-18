import { Router } from '@angular/router';
import { Orders } from '../core/shared/models/common.model';
import { forkJoin } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserManagementService } from '../core/shared/services/user-management.service';
import { TableComponent } from '../common/table/table.component';
import { ElementRef, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import * as $ from 'jquery';
import 'bootstrap';
import { ValidationMessage } from '../core/shared/models';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('appspinner') spinner: SpinnerComponent;
  @ViewChild('orderTableComp') tableComp: TableComponent;
  @ViewChild('add_order_modal') add_order_modal: ElementRef;

  public orderForm: FormGroup;
  public addOrderItemForm: FormGroup;
  public channelList: any;
  public userList: any;
  public orders: Orders;
  orderId: any;
  loading: boolean = false;



  constructor(private router: Router, private userService: UserManagementService, private chRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      userId: ['', Validators.required],
      catentryId: ['', Validators.required]
    });
    this.addOrderItemForm = this.fb.group({
      userId: ['', Validators.required],
      orderId: ['', Validators.required],
      catentryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadOrderList();
  }
  loadOrderList() {
    this.userService.getOrderList().subscribe(res => {
      let user_list = [];
      if (res.status == 200) {
        user_list = res.data;
      } else {
        alert(ValidationMessage.SOMETHING_WENT_WRONG + ': ' + res.message);
      }
      this.chRef.detectChanges();
      this.tableComp.initalizeTable(user_list);
    }, error => {
      alert(ValidationMessage.SOMETHING_WENT_WRONG);
    }, () => {
      debugger;
      let button = $('#orders_table_wrapper > div.dt-buttons > button:nth-child(6)');
      if(button){
        button.css("display", "none");
      }
    });
  }

  openAddOrderModal() {
    this.spinner.loading = true;
    this.channelList = [];
    this.userList = [];
    let getUserList = this.userService.getAllUserList();
    let getChannelList = this.userService.getAllChannelList();

    forkJoin([getUserList, getChannelList]).subscribe(results => {
      let res = results[0];
      if (res.status == 200) {
        this.userList = res.data;
      } else {
        alert(res.message);
      }
      res = results[1];
      if (res.status == 200) {
        this.channelList = res.data;
      } else {
        alert(res.message);
      }
    }, error => {
      alert(ValidationMessage.SOMETHING_WENT_WRONG);
    }, () => {
      this.spinner.loading = false;
      $(this.add_order_modal.nativeElement).modal('show');
    });

  }

  openAddOrderItemModal(data) {
    this.router.navigate(['orders/addOrderItem', { 'orderId': data }]);
  }

  createNewOrder() {
    console.log("create new order");
    let body = {
      "packageId": [
      ],
      "productIds": [
        this.orderForm.get('catentryId').value
      ],
      "userId": this.orderForm.get('userId').value
    }

    this.userService.addOrderItem(body).subscribe(
      res => {
        this.spinner.loading = true;
        if (res.status == 200) {
          // let order_list = res.data;
          // this.chRef.detectChanges();
          // this.tableComp.initalizeTable(order_list);
          this.tableComp.destroyTable();
          this.loadOrderList();
          $(this.add_order_modal.nativeElement).modal('hide');
        } else {
          alert(res.message);
        }
      }, error => {
        alert(this.getErrorMessage(error.json()));
        this.spinner.loading = false;
      }, () => {
        this.spinner.loading = false;
      }
    );
  }

  getErrorMessage(error) {
    let msg = ValidationMessage.SOMETHING_WENT_WRONG;
    if (error.message) {
      msg = msg + ' : ' + error.message
    }
    return msg;
  }

  tableLoaded(){
      debugger;
      let button = $('#orders_table_wrapper > div.dt-buttons > button:nth-child(6)');
      if(button){
        button.css("display", "none");
      }
  }

}
