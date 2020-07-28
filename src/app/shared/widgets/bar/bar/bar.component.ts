import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';
@Component({
  selector: 'app-widget-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  series: any[];
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.setChartOptions();
    this.showChart();
  }

  showChart(): void{
    this.store.select(fromRoot.getStateData).subscribe(map => {
      const da = [];
      map.forEach((val, key) => {
        if (key != 'India') {
          val.forEach(v => {
            if (v.latest) {
              const ta = [v.state, v.total];
              da.push(ta);
            }
          });
        }
      });

      da.sort((val1, val2) => {
        return val2[1] - val1[1];
      });
      this.series = da;
      this.setChartOptions();
    });
  }

  setChartOptions(): void{
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'State wise Covid 19 active cases '
      },
      subtitle: {
        text: 'Source: MHO</a>'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cases'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Active Cases in 2020: <b>{point.y:.1f}</b>'
      },
      series: [{
        name: 'Population',
        data: this.series,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    };
  }

}
