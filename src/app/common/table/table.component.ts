import { ElementRef, ViewChild, Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { pdfMake } from 'pdfmake/build/pdfmake';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() heading: string;
  @Input() id: string;
  @Input() columns: Array<string>;
  @Input() rows: Array<Array<any>>;
  @ViewChild('lcoptable') table: ElementRef;
  @Output() openAddModal = new EventEmitter<any>();
  @Output() openEditModal = new EventEmitter<any>();
  @Output() openRemoveModal = new EventEmitter<any>();
  data: Array<any>;

  constructor(private chRef: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  add() {
    this.openAddModal.emit();
  }

  edit(id) {
    this.openEditModal.emit(id);
  }

  remove(id) {
    this.openRemoveModal.emit(id);
  }

  initalizeTable(_data) {
    const tableContext = this;
    this.data = _data;
    this.chRef.detectChanges();
    setTimeout(function () {
      const _table: any = tableContext.table.nativeElement;
      const dataTable = $(_table).DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'copy',
            title: tableContext.heading
          },
          {
            extend: 'csv',
            title: tableContext.heading
          },
          {
            extend: 'excel',
            title: tableContext.heading
          },
          {
            extend: 'pdf',
            title: tableContext.heading
          },
          {
            extend: 'print',
            title: tableContext.heading
          },
          {
            text: "Add",
            action: () => {
              tableContext.add();
            }
          },
          {
            text: "Edit",
            action: () => {
              tableContext.edit('');
            }
          },
          {
            text: "Delete",
            action: () => {
              tableContext.remove('');
            }
          }],
        columnDefs: [{
          orderable: false,
          className: 'select-checkbox',
          targets: 0
        }],
        select: {
          style: 'os',
          selector: 'td:first-child'
        },
        "order": [[1, 'asc']],
        "autoWidth": false,
        "orderClasses": false
      }
      );
      console.log(dataTable.buttons);
      // dataTable.buttons.container
      // .appendTo('#example_wrapper .col-md-6:eq(0)');
    }, 0);
  }
}
