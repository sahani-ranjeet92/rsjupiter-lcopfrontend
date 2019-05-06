
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private router: Router,private localStorage: LocalStorageService) { }
}
