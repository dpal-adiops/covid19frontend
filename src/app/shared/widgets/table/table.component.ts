import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app.reducer';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['id', 'state', 'cases', 'cured', 'death', 'total'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.store.select(fromRoot.getStateData).subscribe(data => data.forEach(item => {
       if (item) {
      this.ELEMENT_DATA.push(item);
       }
    }));
   // this.dataSource.paginator = this.paginator;
  }



}

export interface PeriodicElement {
  id: number;
  state: string;
  cases: number;
  cured: number;
  death: number;
  total: number;
}



