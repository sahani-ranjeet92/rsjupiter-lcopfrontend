import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { forkJoin } from 'rxjs';
import { UserManagementService } from '../../core/shared/services/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../../core/shared/models/common.model';
import { TableComponent } from '../../common/table/table.component';
import { ViewChild, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';
import { ValidationMessage } from '../../core/shared/models';


@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss']
})
export class AddOrderItemComponent implements OnInit {

  @ViewChild('appspinner') spinner: SpinnerComponent;
  @ViewChild('orderChannelsTableComp') orderChannelsTableComp: TableComponent;
  @ViewChild('channelsTableComp') channelsTableComp: TableComponent;

  public orders: Orders;

  constructor(private route: ActivatedRoute, private userService: UserManagementService) { }

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
        this.orderChannelsTableComp.initalizeTable(this.orders.channels);
      } else {
        alert(ValidationMessage.SOMETHING_WENT_WRONG);
      }

      res = results[1];
      if (res.status == 200) {
        this.channelsTableComp.initalizeTable(res.data);
      } else {
        alert(ValidationMessage.SOMETHING_WENT_WRONG);
      }

    }, error => {
      alert(this.getErrorMessage(error));
      this.spinner.loading = false;
    }, () => {
      this.spinner.loading = false;
    });

  }

  removeOrderItem(data) {
    console.log(data);
    let body = {
      "orderItemsId": data,
      "orderId": this.orders.orderId
    };
    if (confirm('Are You Sure?')) {
      this.userService.removeOrderItem(body).subscribe(res => {
        this.spinner.loading = true;
        if (res.status == 200) {
          this.orderChannelsTableComp.destroyTable();
          this.channelsTableComp.destroyTable();
          this.initAddOrderItem(this.orders.orderId);
        } else {
          alert(res.message);
        }
      }, error => {
        alert(this.getErrorMessage(error));
      }, () => {
        this.spinner.loading = false;
      });
    }
  }

  addOrderItem(id) {
    this.spinner.loading = true;
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
          this.orderChannelsTableComp.destroyTable();
          this.channelsTableComp.destroyTable();
          this.initAddOrderItem(this.orders.orderId);
        } else {
          alert(res.message);
        }
      }, error => {
        alert(this.getErrorMessage(error));
        this.spinner.loading = false;
      }, () => {
        this.spinner.loading = false;
      }
    );

  }

  getErrorMessage(error) {
    let msg = ValidationMessage.SOMETHING_WENT_WRONG;
    if (error.message) {
      msg = msg + ':' + error.message
    }
    return msg;
  }

}
