import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { HttpHelperService } from '../http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private userApiService: UserApiService, private httpHelper: HttpHelperService) { }

  //user service

  logIn(body: any) {
    return this.httpHelper.get(this.userApiService.getLoginUrl(), body, false, null);
  }

  getAllUserList() {
    return this.httpHelper.get(this.userApiService.getAllUserListUrl(), null);
  }

  addNewUser(body: any) {
    return this.httpHelper.post(this.userApiService.getAddNewUserUrl(), body);
  }

  removeUser(body: any) {
    return this.httpHelper.post(this.userApiService.getRemoveUserUrl(), body, true);
  }

  getUserDetail(body: any) {
    return this.httpHelper.post(this.userApiService.getUserDetailUrl(), body, true);
  }

  updateUser(body: any) {
    return this.httpHelper.post(this.userApiService.getUpdateUserUrl(), body);
  }


  // channel service
  
  getAllChannelList() {
    return this.httpHelper.get(this.userApiService.getAllChannelListUrl(), null);
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

  getOrderDetail(body: any) {
    return this.httpHelper.get(this.userApiService.getOrderDetailUrl(), body, true);
  }

  addOrderItem(body: any) {
    return this.httpHelper.post(this.userApiService.getAddOrderItemUrl(), body);;
  }

  removeOrderItem(body: any) {
    return this.httpHelper.post(this.userApiService.getRemoveOrderItemUrl(), body);
  }



}
