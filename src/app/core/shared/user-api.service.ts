import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUrl = environment.BASE_API_URL;

  constructor() { }

  getLoginUrl() {
    return this.baseUrl + "/lco-user/getUser";
  }


  getAllUserListUrl() {
    return this.baseUrl + "/lco-user/getUserList";
  }

  getAddNewUserUrl() {
    return this.baseUrl + "/lco-user/addNewUser";
  }
  getRemoveUserUrl() {
    return this.baseUrl + "/lco-user/removeUser";
  }

  getUserDetailUrl() {
    return this.baseUrl + "/lco-user/getUserDetail";
  }

  getUpdateUserUrl() {
    return this.baseUrl + "/lco-user/updateUserDetail";
  }

  getAllChannelListUrl() {
    return this.baseUrl + "/product/getProductList";
  }

  getAddChannelUrl() {
    return this.baseUrl + "/product/addProduct";
  }

  getChannelDetailUrl() {
    return this.baseUrl + "/product/getProduct";
  }

  getUpdateChannelUrl() {
    return this.baseUrl + "/product/updateProduct";
  }

  getRemoveChannelUrl() {
    return this.baseUrl + "/product/removeProduct";
  }

  getOrderListUrl() {
    return this.baseUrl + "/order-service/getOrderList";
  }

  getOrderDetailUrl() {
    return this.baseUrl + "/order-service/getOrderDetail";
  }

  getAddOrderItemUrl() {
    return this.baseUrl + "/order-service/addOrderItem";
  }

  getRemoveOrderItemUrl() {
    return this.baseUrl + "/order-service/removeOrderItem"
  }


}
