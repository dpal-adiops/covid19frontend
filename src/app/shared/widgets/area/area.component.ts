import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app.reducer';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  region1: string;

  @Input()
  set region(name: string) {
  this.region1 = name;
  this.showChart();
  }


  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit(): void {
    this.showChart();
  }
  showChart(): void {
    this.store.select(fromRoot.getStateData).subscribe(map => {

      const dataArr = map.get(this.region1);
      const timeline = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const cases = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      dataArr.forEach(elem => {
       const index =  timeline.findIndex( a => a == elem.month);
       cases[index] = elem.total;
      });
      timeline.splice(-5);
      cases.splice(-5);

      this.chartOptions = {
        chart: {
          type: 'area'
        },
        title: {
          text: `Covid 19 Cases Growth in ${this.region1}`
        },
        subtitle: {
          text: 'Source: MOH'
        },
        xAxis: {
          categories: timeline,
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        yAxis: {
          title: {
            text: 'Thousand'
          },
          labels: {
            formatter: function () {
              return this.value / 1000;
            }
          }
        },
        tooltip: {
          split: true,
          valueSuffix: ' '
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#666666'
            }
          }
        },
        series: [{
          name: 'India',
          data: cases
        }]
      };
    });
    HC_exporting(this.Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }


}
