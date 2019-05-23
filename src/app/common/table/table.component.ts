import {ElementRef, ViewChild,  Component,  OnInit,  Input,  Output,  EventEmitter,  ChangeDetectorRef} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
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
  @Output() initTable = new EventEmitter<any>();
  data: Array<any>;
  @ViewChild('lcoptable') table: ElementRef;

  constructor(private chRef: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.table.nativeElement.value);
  }

  callParent() {
    debugger;
    this.initTable.emit(this.columns);
  }

  loadChannelsTable(_data) {
    const tableContext=this;
    this.data = _data;
    this.chRef.detectChanges();
    debugger;
    setTimeout(function () {
      const _table: any = tableContext.table.nativeElement;
      const dataTable = $(_table).DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        "columnDefs": [
          {
            "className": "dt-right",
            "targets": [1, 2, 3, 4]
          },
          {
            "orderable": false,
            "targets": 0
          }
        ],
        "order": [],
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
