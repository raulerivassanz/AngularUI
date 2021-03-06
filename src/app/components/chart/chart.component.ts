import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { CoinInfo } from '../globaldata';

import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

  coin_data : any;
  chartHistory : any;

  selCoin = 0;
  inteval : any;
  updateFlag =  false;
  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {   chart: {
    type: 'line',    
    backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },  
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
    },
    legend: {
      itemStyle: {
          color: '#E0E0E3',
          fontSize : '15px'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      }
    },
    yAxis: {
        title: {
            text: 'Price (USD)'
        },
        lineColor : '#FFFFFF'
    },
    plotOptions: {
        area: {
          fillColor: {
              linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
              },
              stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
          },
          marker: {
              radius: 2
          },
          lineWidth: 1,
          states: {
              hover: {
                  lineWidth: 1
              }
          },
          threshold: null
      }
    },
    series: [{
        name: 'Coin',
        data: [] 
    }]}; // required
    
  intervalString = ['1m','15m','1h','1d','1w','1m','3m'];
  currentInterval = '1d';
  constructor(
    private apiservice : ApiService,
    public coinInfo: CoinInfo
  ) { }

  ngOnInit() {
    this.coin_data = this.coinInfo.getCheckedCoins();
    this.getData();
    this.inteval = setInterval(()=>{
     this.getData();
    },60000);       
  }
  ngOnDestroy() {
    // console.log("Leave page");
    if(this.inteval){
      clearInterval(this.inteval);
    }
  }

  getData(){
    if(this.coin_data[this.selCoin].site == 'coincap') {
      this.apiservice.getCryptoPriceHistory(this.coin_data[this.selCoin].market, this.currentInterval)
      .subscribe(data=>{
        this.chartHistory = data;
        this.setChartCoin(this.coin_data[this.selCoin].site);
      });
    } else {
      this.apiservice.getCryptoComparePriceHistory(this.coin_data[this.selCoin].symbol, this.currentInterval)
      .subscribe(data=>{
        this.chartHistory = data;
        this.setChartCoin(this.coin_data[this.selCoin].site);
      });
    }
  }
  changeStyle($event,i){
    if(i!=this.selCoin)
    this.coin_data[i].hover = $event.type == 'mouseover';
  }
  setSelCoin(i) {
    this.selCoin = i;
    this.coin_data[i].hover = false;
    this.getData();
  }

  setChartCoin(site) {
    this.chartOptions.series[0].data = [];
    this.chartOptions.series[0].name = this.coin_data[this.selCoin].name;
    if(site == "coincap") {
      for(let i = 0 ;i < this.chartHistory.data.length; i++){
        this.chartOptions.series[0].data.push({x: this.chartHistory.data[i].time, y: parseFloat(this.chartHistory.data[i].priceUsd)});
      }
    } else {
      for(let i = 0 ;i < this.chartHistory.Data.length; i++){
        this.chartOptions.series[0].data.push({x: this.chartHistory.Data[i].time, y: parseFloat(this.chartHistory.Data[i].close)});
      }
    }
    this.updateFlag = true;
  }

  changeInterval(value){
    this.currentInterval = value;
    this.getData();
  }

  onClickButton(element) {
    console.log(element);
  }
}
