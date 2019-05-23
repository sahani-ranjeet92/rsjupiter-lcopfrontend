import { UserManagementService } from '../core/shared/services/user-management.service';
import {ViewChild, ChangeDetectorRef,  Component,  OnInit,  Output} from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { pdfMake } from 'pdfmake/build/pdfmake';
// import {pdfMake} from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  @ViewChild('tableComp') tableComp: TableComponent;
  channel_list: any = null;

  constructor(private userService: UserManagementService, private chRef: ChangeDetectorRef) { }

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
      //this.loadChannelsTable();
      this.tableComp.loadChannelsTable(this.channel_list);
      // this.initTable.emit(this.channel_list);

    }, error => {

    }, () => {

    });
  }

  loadChannelsTable() {
    setTimeout(function () {
      const table: any = $('#table-channels');
      const dataTable = $('#table-channels').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        "columnDefs": [
          {
            "className": "dt-right",
            "targets": [1, 2, 3, 4]
          },
          {
            "orderable": false,
            "targets": 0
          }
        ],
        "order": [],
        "autoWidth": false,
        "orderClasses": false
      }
      );
      console.log(dataTable.buttons);
      // dataTable.buttons.container
      // .appendTo('#example_wrapper .col-md-6:eq(0)');
    }, 0);




  }

  callFromChild(data){
    console.log(data);
  }

}
