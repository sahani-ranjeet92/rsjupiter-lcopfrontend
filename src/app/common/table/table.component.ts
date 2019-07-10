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
  @Output() tableLoaded = new EventEmitter<any>();
  data: Array<any>;
  dataTable: any;

  constructor(private chRef: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  add() {
    this.openAddModal.emit();
  }

  edit(id) {
    if (id) {
      this.openEditModal.emit(id);
    } else {
      alert("please select item!")
    }

  }

  remove(id) {
    if (id) {
      this.openRemoveModal.emit(id);
    } else {
      alert("please select item!")
    }
  }

  destroyTable() {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  initalizeTable(_data) {
    const tableContext = this;
    this.data = _data;
    this.chRef.detectChanges();
    setTimeout(function () {
      const _table: any = tableContext.table.nativeElement;
      tableContext.dataTable = $(_table).DataTable({
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
              let selectedRow = $('#' + tableContext.id + ' tbody tr.selected td.select-checkbox div').html();
              console.log(selectedRow);
              tableContext.edit(selectedRow);
            }
          },
          {
            text: "Delete",
            action: () => {
              let selectedRow = $('#' + tableContext.id + ' tbody tr.selected td.select-checkbox div').html();
              tableContext.remove(selectedRow);
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
     tableContext.tableLoaded.emit();
    }, 0);
  }
}
