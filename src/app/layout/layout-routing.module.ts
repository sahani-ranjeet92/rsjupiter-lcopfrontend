import { AuthGuard } from '../core/guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'channels', loadChildren: '../channels/channels.module#ChannelsModule', canActivate: [AuthGuard]
      },
      {
        path: 'users', loadChildren: '../users/users.module#UsersModule', canActivate: [AuthGuard]
      },
      {
        path: 'orders', loadChildren: '../orders/orders.module#OrdersModule', canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
