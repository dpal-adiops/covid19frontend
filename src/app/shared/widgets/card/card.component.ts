import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app.reducer';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  @Input() label: string;

  region1: string;

  @Input() total: string;

  constructor(private store: Store<fromRoot.State>) { }

  @Input()
  set region(name: string) {
  this.region1 = name;
  this.showChart();
  }

  ngOnInit(): void {
    this.showChart();
  }
  showChart(): void {
    this.store.select(fromRoot.getStateData).subscribe(map => {

      const dataArr = map.get(this.region1);
      const timeline = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const cases = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const death = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const recovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const active = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      dataArr.forEach(elem => {
        const index = timeline.findIndex(a => a == elem.month);
        cases[index] = elem.total;
        death[index] = elem.death;
        recovered[index] = elem.cured;
        active[index] = elem.cases;
      });
      timeline.splice(-5);
      cases.splice(-5);
      death.splice(-5);
      recovered.splice(-5);
      active.splice(-5);

      let data1: number[];
      if (this.label == 'Cases') {
        data1 = cases;
      } else if (this.label == 'Active') {
        data1 = active;
      } else if (this.label == 'Recovered') {
        data1 = recovered;
      } else if (this.label == 'Death') {
        data1 = death;
      }




      this.chartOptions = {
        chart: {
          type: 'area',
          backgroundColor: null,
          borderWidth: 0,
          margin: [2, 2, 2, 2],
          height: 60

        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        exporting: false,
        series: [{
          data: data1
        }]
      };
    });
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

  }

}
