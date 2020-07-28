import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  series: number[];
  timeline: string[];
  region1: string;


  @Input()
  set region(name: string) {
    this.region1 = name;
    this.showChart();
  }


  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit(): void {
    this.drawChart();

  }

  showChart(): void {
    this.store.select(fromRoot.getStateData).subscribe((map) => {
      const dataArr = map.get(this.region1);
      if (dataArr) {
        this.timeline = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.series = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        dataArr.forEach(elem => {
          const index = this.timeline.findIndex(a => a == elem.month);
          this.series[index] = elem.total;
        });
        this.timeline.splice(-5);
        this.series.splice(-5);
      }

    });
    this.drawChart();
  }

  drawChart(): void {
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
        categories: this.timeline,
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
        data: this.series
      }]
    };

    HC_exporting(this.Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }


}
