import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [ 
  {
    path : '', component : RegisterComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports :[RouterModule]
})
export class RegisterRoutingModule { }
