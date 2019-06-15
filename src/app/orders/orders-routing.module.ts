import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { AddOrderItemComponent } from './add-order-item/add-order-item.component';


const routes: Routes = [
  {
    path: '', component: OrdersComponent
  },
  {
    path: 'addOrderItem', component: AddOrderItemComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
