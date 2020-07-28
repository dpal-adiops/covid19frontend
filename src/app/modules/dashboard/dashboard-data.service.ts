import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fromRoot from './../../app.reducer';
import * as Dashboard from './dashboard.actions';
import { Store } from '@ngrx/store';
import * as UI from 'src/app/shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) { }

  initDataListener(): void {
    this.store.select(fromRoot.getStateData).subscribe( map => {
      if (!map.has('India')){
        this.getStateWiseData();
        this.getCountryData();
      }
    });
  }

  getStateWiseData(): void {

    const tHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    this.http.get<any>(`${environment.APP_URL}/dashboard/regions`, { headers: tHeaders })
      .subscribe(
        data => {
          data.forEach(region => {
            this.getData(region);
          });
        },
        err => console.log(err)
      );
  }

  getCountryData(): void {
    this.store.dispatch(new UI.StartLoading());
    const tHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    this.http.get<any>(`${environment.APP_URL}/dashboard/region/india`, { headers: tHeaders })
      .subscribe(
        data => {
          this.store.dispatch(new Dashboard.SetDashboardData('India', data));
          this.store.dispatch(new UI.StopLoading());
        },
        err => console.log(err)
      );
  }

  getData(region: string): void {

    const tHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    this.http.get<any>(`${environment.APP_URL}/dashboard/region/${region}`, { headers: tHeaders })
      .subscribe(
        data => {
          this.store.dispatch(new Dashboard.SetDashboardData(region, data));
        },
        err => console.log(err)
      );
  }

}
