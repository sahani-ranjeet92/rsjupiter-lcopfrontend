import { UserManagementService } from '../core/shared/services/user-management.service';
import {ViewChild, ChangeDetectorRef,  Component,  OnInit,  Output} from '@angular/core';
import { TableComponent } from '../common/table/table.component';



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
      this.tableComp.loadChannelsTable(this.channel_list);

    }, error => {

    }, () => {

    });
  }

  callFromChild(data){
    console.log(data);
  }

}
