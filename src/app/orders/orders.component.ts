import {UserManagementService} from '../core/shared/services/user-management.service';
import {TableComponent} from '../common/table/table.component';
import {ChangeDetectorRef, Component,  OnInit,  ViewChild} from '@angular/core';
import { SpinnerComponent } from '../common/spinner/spinner.component';
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

  constructor(private userService: UserManagementService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadOrderList();
  }
  loadOrderList() {
    this.userService.getOrderList().subscribe(res => {
      let user_list = [];
      if (res.status == 200) {
        user_list = res.data;
      }else{
        alert(ValidationMessage.SOMETHING_WENT_WRONG +': '+ res.message);
      }
      this.chRef.detectChanges();
      this.tableComp.initalizeTable(user_list);

    }, error => {
      alert(ValidationMessage.SOMETHING_WENT_WRONG);
    }, () => {

    });
  }



}
