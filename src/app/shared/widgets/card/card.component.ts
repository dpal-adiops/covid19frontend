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
  series: number[];
  total: number;
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
    this.store.select(fromRoot.getStateData).subscribe(map => {
      const dataArr = map.get(this.region1);

      const timeline = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const cases = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const death = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const recovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const active = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let i = 0;
      dataArr.forEach(elem => {
        const index = timeline.findIndex(a => a == elem.month);
        cases[index] = elem.total;
        death[index] = elem.death;
        recovered[index] = elem.cured;
        active[index] = elem.cases;
        i++;
      });

      console.log(timeline.length);
      cases.splice(i - ((timeline.length)));
      death.splice(i - ((timeline.length)));
      recovered.splice(i - ((timeline.length)));
      active.splice(i - ((timeline.length)));

      if (this.label == 'Cases') {
        this.series = cases;
        this.total = cases[i - 1];
      } else if (this.label == 'Active') {
        this.series = active;
        this.total = active[i - 1];
      } else if (this.label == 'Recovered') {
        this.series = recovered;
        this.total = recovered[i - 1];
      } else if (this.label == 'Death') {
        this.series = death;
        this.total = death[i - 1];
      }

    });
    this.drawChart();
  }

  drawChart(): void{
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
        data: this.series
      }]
    };

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

  }

}
