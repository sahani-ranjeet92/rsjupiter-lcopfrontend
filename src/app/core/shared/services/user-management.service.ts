import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { HttpHelperService } from '../http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private userApiService: UserApiService,private httpHelper: HttpHelperService) { } 

  logIn(body : any){
    return this.httpHelper.post(this.userApiService.getLoginUrl(),body,true,false,null);
  }

}
