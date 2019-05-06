import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import { AuthGuard } from './shared';

const routes: Routes = [
    //{ path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterModule' },
    //{ path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    //{ path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    //{ path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', component : NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
