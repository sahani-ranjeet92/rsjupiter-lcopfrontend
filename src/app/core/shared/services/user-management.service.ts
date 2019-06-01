import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { HttpHelperService } from '../http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private userApiService: UserApiService, private httpHelper: HttpHelperService) { }

  logIn(body: any) {
    return this.httpHelper.get(this.userApiService.getLoginUrl(), body, false, null);
  }

  getAllChannelList() {
    return this.httpHelper.get(this.userApiService.getAllChannelListUrl(), null);
  }

  getAllUserList() {
    return this.httpHelper.get(this.userApiService.getAllUserListUrl(), null);
  }

  addChannel(body: any) {
    return this.httpHelper.post(this.userApiService.getAddChannelUrl(), body);
  }

  removeChannel(body: any) {
    return this.httpHelper.post(this.userApiService.getRemoveChannelUrl(), body, true);
  }

  getChannelDetail(body: any) {
    return this.httpHelper.post(this.userApiService.getChannelDetailUrl(), body, true);
  }

  updateChannel(body: any) {
    return this.httpHelper.post(this.userApiService.getUpdateChannelUrl(), body);
  }

  // order service start here

  getOrderList() {
    return this.httpHelper.get(this.userApiService.getOrderListUrl(), null);
  }



}
