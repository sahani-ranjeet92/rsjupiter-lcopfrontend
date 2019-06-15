import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonComponentModule }  from '../common/common.module';
import { AddOrderItemComponent } from './add-order-item/add-order-item.component';

@NgModule({
  declarations: [OrdersComponent,AddOrderItemComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CommonComponentModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
