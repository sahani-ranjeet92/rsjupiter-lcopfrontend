import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from './channels.component';
import { ChannelsRoutingModule } from './channels-routing.module';
import { CommonComponentModule } from '../common/common.module';

@NgModule({
  declarations: [ChannelsComponent],
  imports: [
    CommonModule,
    ChannelsRoutingModule,
    CommonComponentModule,
    ReactiveFormsModule
  ]
})
export class ChannelsModule { }
