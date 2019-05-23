import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserApiService } from './core/shared/user-api.service';
import { HttpHelperService } from './core/shared/http-helper.service';
import { UserManagementService } from './core/shared/services/user-management.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guard/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        // LanguageTranslationModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot()

    ],
    declarations: [AppComponent, NotFoundComponent],
    providers: [UserApiService, HttpHelperService, UserManagementService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
