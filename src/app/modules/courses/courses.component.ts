import { Component, OnInit, Input } from '@angular/core';
import { DashboardDataService } from '../dashboard/dashboard-data.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  selected: string;
  datamap = new Map();
  constructor(private tDashboardDataService: DashboardDataService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.store.select(fromRoot.getStateData).subscribe(map => {
      map.forEach((val, key) => {
        if (key != 'India') {
          val.forEach(v => {
            if (v.latest) {
              this.datamap.set(key, v);
              if (v.state == 'Delhi') {
                this.selected = v.state ;
              }
            }
          });
        }
      });
    });
  }

}
