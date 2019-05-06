import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { HttpHelperService } from '../http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private userApiService: UserApiService,private httpHelper: HttpHelperService) { } 

}
