import { UserManagementService } from '../core/shared/services/user-management.service';
import { ViewChild, ChangeDetectorRef, Component, OnInit, Output, ElementRef } from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  @ViewChild('tableComp') tableComp: TableComponent;
  @ViewChild('add_channel_modal') add_channel_modal: ElementRef;
  channel_list: any = null;
  public channelForm: FormGroup;

  constructor(private userService: UserManagementService, private chRef: ChangeDetectorRef, private fb: FormBuilder) {
   this.channelForm =  this.fb.group({
      chnumber: ['', Validators.required],
      chname: ['',Validators.required],
      price: ['', Validators.required],
      channelImage: ['',Validators.required]
    });
  }

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
      this.tableComp.initalizeTable(this.channel_list);

    }, error => {

    }, () => {

    });
  }

  openAddModal() {
    console.log("open modal");
    $(this.add_channel_modal.nativeElement).modal('show');
  }

  openEditModal(data) {
    console.log(data);
    alert("open modal");
  }

  openRemoveModal(data) {
    console.log(data);
    alert("open modal");
  }

  addChannel(){
    console.log("add channel");
  }

}
