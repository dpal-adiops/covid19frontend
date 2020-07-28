import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from '../dashboard/dashboard-data.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  uiload$: Observable<boolean>;

  totalcase: number;
  activecase: number;
  deathcase: number;
  curedcase: number;


  constructor(private tDashboardDataService: DashboardDataService, private store: Store<fromRoot.State>) {
    tDashboardDataService.initDataListener();
  }

  ngOnInit(): void {
    this.uiload$ = this.store.select(fromRoot.getIsLoading);
    /*
    this.store.select(fromRoot.getStateData).subscribe(map => {
      const dataArr = map.get('India');
      const timeline = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const cases = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const death = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const recovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const active = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let i = 0;
      dataArr.forEach(elem => {
        const index = timeline.findIndex(a => a == elem.month);
        cases[index] = elem.total/1000;
        death[index] = elem.death/1000;
        recovered[index] = elem.cured/1000;
        active[index] = elem.cases/1000;
        i++;
      });
      this.activecase = active[i-1];
      this.curedcase = recovered[i-1];
      this.deathcase = death[i-1];
      this.totalcase = cases[i-1];
    });
    */
  }
}
