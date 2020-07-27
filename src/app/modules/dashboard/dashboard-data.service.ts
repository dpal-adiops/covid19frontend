import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fromRoot from './../../app.reducer';
import * as Dashboard from './dashboard.actions';
import { Store } from '@ngrx/store';

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
        this.getCountryData();
        this.getStateWiseData();
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

    const tHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    this.http.get<any>(`${environment.APP_URL}/dashboard/region/india`, { headers: tHeaders })
      .subscribe(
        data => {

          this.store.dispatch(new Dashboard.SetDashboardData('India', data));
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
