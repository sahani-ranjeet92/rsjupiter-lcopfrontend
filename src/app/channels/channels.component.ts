import { UserManagementService } from '../core/shared/services/user-management.service';
import {ChangeDetectorRef, Component,  OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channel_list: any = null;

  constructor(private userService: UserManagementService,private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadChannelList();

  }
  loadChannelList() {
    this.userService.getAllChannelList().subscribe(res => {
      if (res.status == 200) {
        this.channel_list = null;
        this.channel_list = res.data;
      }
      this.chRef.detectChanges();
     const table: any = $('#table-channels');
    const dataTable = table.DataTable(); 
     //setTimeout(function () {
//   $(function () {
//     const dataTable = table.DataTable();
//   });
// }, 3000);
    }, error => {

    }, () => {
       
    });
  }

}
