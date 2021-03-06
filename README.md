# LcopFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
9*
-+9+-## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


##misc

ng g m register\register-routing document-list --flat

ng generate component pages/about --module=app.module
// or
ng generate component pages/about --module=shared.module

ng generate class foo --type=bar --> foo.bar.ts

##How to create sub module? start

ng g m users

ng g m users/users-routing document-list --flat

ng g c users --module=users.module

##update user.module

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }


###update the users-routing module

const routes: Routes = [
  {
    path: '', component: UsersComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

##How to create sub module? end here

##create routes in layout.module
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'users', loadChildren: '../users/users.module#UsersModule', canActivate: [AuthGuard]
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


######  How to setup datatable?

##install dependency
npm install datatables.net
npm install @types/datatables.net --save-dev
npm install jszip --save
npm install datatables.net-buttons --save
npm install datatables.net-buttons-dt --save
npm install datatables.net-buttons-bs4 --save
npm install @types/datatables.net-buttons --save-dev
npm install pdfmake --save
npm install @types/pdfmake --save-dev


##add import statementimport 'datatables.net';
import * as $ from 'jquery';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import {pdfMake} from 'pdfmake/build/pdfmake';
import {pdfFonts} from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

### use by adding 
const dataTable = $('#table-channels').DataTable({
        dom: 'Bfrtip',
buttons: ['copy', 'csv', 'excel', 'pdf', 'print']});


##### call method of another component (from child to parent)#####
----> component A (child component)
@Output() initTable = new EventEmitter();

-----> component B (parent component)
define loadTableData() function

-----> from component B html file
<app-table (initTable)="loadTableData()"></app-table>

#### access the function/properties of child component (from parent to child) ####
#by template reference 
-----> from component B html file
<app-table #apptable (initTable)="loadTableData()"></app-table>

------> from component B ts file
@ViewChild('apptable') apptable: AppTableComponent;

#for example:---
apptable.anyproperty
apptable.anyfunction

