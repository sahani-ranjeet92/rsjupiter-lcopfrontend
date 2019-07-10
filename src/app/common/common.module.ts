import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SpinnerComponent } from './spinner/spinner.component';
@NgModule({
  declarations: [ TableComponent, SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports:[TableComponent,SpinnerComponent]
})
export class CommonComponentModule { }
