import {UserManagementService} from '../core/shared/services/user-management.service';
import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap, map } from 'rxjs/internal/operators';
import {ChangeDetectorRef, Component,  OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableComponent } from '../common/table/table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('tableComp') tableComp: TableComponent;

  constructor(private userService: UserManagementService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadChannelList();
  }
  loadChannelList() {
    this.userService.getAllUserList().subscribe(res => {
      let user_list = [];
      if (res.status == 200) {
        user_list = res.data;
      }else{
        alert("server error: "+res.message);
      }
      this.chRef.detectChanges();
      this.tableComp.loadChannelsTable(user_list);

    }, error => {

    }, () => {

    });
  }



  // ngOnInit() {

    // const myArray = [1, 2, 3, 4];
    // from([45, 41, 40]).pipe(concatMap(item => { item = Number.parseInt(JSON.stringify(item))+1; 
    //   return of(item).pipe(delay(1000)); })).subscribe(data => {
        
    //   console.log(data);
    // });

    // from(myArray).pipe(
    //   concatMap(item => of(item).pipe(delay(1000)))
    // ).subscribe(timedItem => {
    //   this._data = this._data + timedItem;
    //   console.log(timedItem)
    // });

    // const fakeSubscriber = new BehaviorSubject(0);
    // fakeSubscriber.next(12);
    // fakeSubscriber.next(12);
    // fakeSubscriber.next(12);
    // fakeSubscriber.next(12);
    // fakeSubscriber.next(12);
    // fakeSubscriber.next(12);
    // fakeSubscriber.subscribe(data => {
    //   //debugger;
    //   this._data = this._data + data;
    //   console.log(data);
    // });


  // }

}
