import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { forkJoin } from 'rxjs';
import { UserManagementService } from '../../core/shared/services/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../../core/shared/models/common.model';
import { TableComponent } from '../../common/table/table.component';
import {ChangeDetectorRef, ElementRef,  ViewChild,  Component,  OnInit} from '@angular/core';
import { ValidationMessage } from '../../core/shared/models';
import * as $ from 'jquery';
import 'bootstrap';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-select';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss']
})
export class AddOrderItemComponent implements OnInit {

  @ViewChild('appspinner') spinner: SpinnerComponent;
  @ViewChild('orderChannelsTableComp') orderChannelsTableComp: ElementRef;
  @ViewChild('channelsTableComp') channelsTableComp: ElementRef;

  public orders: Orders;
  public channels: any;
  orderChannelsDataTable: any;
  channelsTable: any;

  constructor(private route: ActivatedRoute, private userService: UserManagementService,private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    let orderId = this.route.snapshot.params['orderId'];
    this.initAddOrderItem(orderId)
  }

  initAddOrderItem(data) {
    console.log(data);
    this.spinner.loading = true;
    let body = { "orderId": data };
    let getOrderDetail = this.userService.getOrderDetail(body);
    let getChannelList = this.userService.getAllChannelList();

    forkJoin([getOrderDetail, getChannelList]).subscribe(results => {
      let res = results[0];
      if (res.status == 200) {
        this.orders = res.data;
        this.initalizeOrderItemsTable();
      } else {
        alert(ValidationMessage.SOMETHING_WENT_WRONG);
      }

      res = results[1];
      if (res.status == 200) {
        this.channels = res.data;
        this.initalizeChannelsTable();
      } else {
        alert(ValidationMessage.SOMETHING_WENT_WRONG);
      }

    }, error => {
      alert(this.getErrorMessage(error.json()));
      this.spinner.loading = false;
    }, () => {
      this.spinner.loading = false;
    });

  }

  removeOrderItem(data) {
    console.log(data);
    if (!data) {
      alert("Please select item");
      return;
    }
    let body = {
      "orderItemId": data,
      "orderId": this.orders.orderId,
      "userId": this.orders.userId
    };
    if (confirm('Are You Sure?')) {
      this.spinner.loading = true;
      this.userService.removeOrderItem(body).subscribe(res => {
        if (res.status == 200) {
          this.orders = res.data;
          this.orderChannelsDataTable.destroy();
          this.initalizeOrderItemsTable();
        } else {
          alert(res.message);
        }
      }, error => {
        alert(this.getErrorMessage(error.json()));
        this.spinner.loading = false;
      }, () => {
        this.spinner.loading = false;
      });
    }
  }

  addOrderItem(id) {
    if(!id){
      alert("Please select item")
      return;
    }
    let body = {
      "packageId": [
      ],
      "productIds": [
        id
      ],
      "userId": this.orders.userId
    }

    this.userService.addOrderItem(body).subscribe(
      res => {
        this.spinner.loading = true;
        if (res.status == 200) {
          $('#table-channels tbody tr.selected').toggleClass('selected');
          this.orderChannelsDataTable.destroy();
          this.initalizeOrderItemsTable();
          this.channelsTable.destroy();
          this.initalizeChannelsTable();
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

  initalizeOrderItemsTable() {
    const tableContext = this;
    this.chRef.detectChanges();
    setTimeout(function () {
      const _table: any = tableContext.orderChannelsTableComp.nativeElement;
      tableContext.orderChannelsDataTable = $(_table).DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            text: "Remove",
            action: () => {
              let selectedRow = $('#table-order-channels tbody tr.selected td.select-checkbox span').html();
              tableContext.removeOrderItem(selectedRow);
           }
          }],
        columnDefs: [{
          orderable: false,
          className: 'select-checkbox',
          targets: 0
        }],
        select: {
          style: 'os',
          selector: 'td:first-child'
        },
        "order": [[1, 'asc']],
        "autoWidth": false,
        "orderClasses": false
      }
      );
    }, 0);
  }

  initalizeChannelsTable() {
    const tableContext = this;
    this.chRef.detectChanges();
    setTimeout(function () {
      const _table: any = tableContext.channelsTableComp.nativeElement;
      tableContext.channelsTable = $(_table).DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            text: "Add",
            action: () => {
              let selectedRow = $('#table-channels tbody tr.selected td.select-checkbox span').html();
              tableContext.addOrderItem(selectedRow);
            }
          }],
        columnDefs: [{
          orderable: false,
          className: 'select-checkbox',
          targets: 0
        }],
        select: {
          style: 'os',
          selector: 'td:first-child'
        },
        "order": [[1, 'asc']],
        "autoWidth": false,
        "orderClasses": false
      }
      );
    }, 0);
  }

}
