import { Component, OnInit } from '@angular/core';
import { UserInfo, MarketInfo, CoinInfo, AppConstants } from '../globaldata';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  sendingAmountC = '0.00';
  sendingAmountU = '0.00';
  receivingAmountC = '0.00'; 
  receivingAmountU = '0.00';
  sendCoin: any;
  receiveCoin: any;
  coin_data: any;
  _baseURL: string;
  
  constructor(
    public marketInfo: MarketInfo,
    public coinInfo: CoinInfo,
    private userInfo: UserInfo,
    private http : HttpClient
  ) {
    this._baseURL = AppConstants.baseURL;
    this.sendingAmountC = this.marketInfo.ex_sendingAmountC;
    this.receivingAmountC = this.marketInfo.ex_receivingAmountC;
    this.sendingAmountU = this.marketInfo.ex_sendingAmountU;
    this.receivingAmountU = this.marketInfo.ex_receivingAmountU;
  }

  // cryptFormControl = new FormControl('',[Validators.required,Validators.email]);
  // useFormControl = new FormControl('',[Validators.required,Validators.email]);
  errorMessage : string = '';
  ngOnInit() {
    this.coin_data = this.coinInfo.getCheckedCoins();
    this.sendCoin = this.coin_data[0];
    this.receiveCoin = this.coin_data[1];
  }

  setSendCoin(coin : any) {
    if(coin.name != this.receiveCoin.name)
      this.sendCoin = coin;

    this.receivingAmountC = '0.00'; 
    this.receivingAmountU = '0.00';
    this.sendingAmountU = '0.00';
    this.sendingAmountC = '0.00';
    this.checkError();
  }
  setReceiveCoin(coin : any){
    if(coin.name != this.sendCoin.name)
      this.receiveCoin = coin;

    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.sendCoin.price, this.receiveCoin.price));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.receiveCoin.price);
  }
  updateReceiveC(){
    if(!this.receivingAmountU || !parseFloat(this.receivingAmountU)){
      this.receivingAmountC = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00';
      return;
    } 
    this.receivingAmountC = this.formalize(parseFloat(this.receivingAmountU)/this.receiveCoin.price);
    this.sendingAmountC = this.formalize(parseFloat(this.receivingAmountC)/this.getCoinsRate(this.sendCoin.price, this.receiveCoin.price));
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.sendCoin.price);
    this.checkError();
  }
  updateReceiveU(){
    if(!this.receivingAmountC || !parseFloat(this.receivingAmountC)){
      this.receivingAmountU = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00'; 
      return;
    } 
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.receiveCoin.price);
    this.sendingAmountC = this.formalize(parseFloat(this.receivingAmountC)/this.getCoinsRate(this.sendCoin.price, this.receiveCoin.price));
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.sendCoin.price);
    this.checkError();
    
  }
  updateSendC(){
    if(!this.sendingAmountU || !parseFloat(this.sendingAmountU)){
      this.sendingAmountC = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountC = this.formalize(parseFloat(this.sendingAmountU)/this.sendCoin.price);
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.sendCoin.price, this.receiveCoin.price));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.receiveCoin.price);
    this.checkError();
  }
  updateSendU(){
    if(!this.sendingAmountC || !parseFloat(this.sendingAmountC)){
      this.sendingAmountU = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.sendCoin.price);
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.sendCoin.price, this.receiveCoin.price));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.receiveCoin.price);
    this.checkError();
  }

  checkError(){
    if(parseFloat(this.sendingAmountC)>this.sendCoin.balance) this.errorMessage = 'Not enough ' + this.sendCoin.long + ' to start this transaction';
    else this.errorMessage = '';
  }

  setAllAmount(){
    this.sendingAmountC = this.formalize(this.sendCoin.balance);
    this.updateSendU();
  }
  setHalfAmount(){
    this.sendingAmountC = this.formalize(this.sendCoin.balance/2);
    this.updateSendU();
  }
  setMinAmount(){
    this.sendingAmountC = this.formalize(this.sendCoin.min);
    this.updateSendU();
  }

  formalize(num : number){
    let str = "" + num;
    let index = str.indexOf('.');

    if (index >= 0 && (str.length - index - 1) > 2) {
      return this.eraseZeros(num.toFixed(8));
    } else {
      return num.toFixed(2);
    }
  }

  eraseZeros(num : string){
    return parseFloat(num).toString();
  }

  getCoinsRate(price1 : any, price2 : any) {
    if(price2 && this.marketInfo.market_rate) {
      let rate = 1 - this.marketInfo.market_rate / 100;
      rate = price1 / price2 * rate;
      return parseFloat(rate.toFixed(8));
    } else {
      return 0;
    }
  }

  changeStyle($event, i){
    if(this.coin_data[i].name != this.sendCoin.name)
      this.coin_data[i].hover = $event.type == 'mouseover';
  }
  changeStyle1($event, i){
    if(this.coin_data[i].name != this.receiveCoin.name)
      this.coin_data[i].hover1 = $event.type == 'mouseover';
  }
  onClickComapreArrow() {
    let coin = this.sendCoin;
    this.sendCoin = this.receiveCoin;
    this.receiveCoin = coin;
    this.receivingAmountC = '0.00'; 
    this.receivingAmountU = '0.00';
    this.sendingAmountU = '0.00';
    this.sendingAmountC = '0.00';
    this.checkError();
  } 


  startExchange(){
    if(this.userInfo.bLogined) {
      this.http.post(this._baseURL + "/market/exchange",
      {
        "username": this.userInfo.username,
        "userid": this.userInfo.userid,
        "sendcoin": this.sendCoin.symbol,
        "recvcoin": this.receiveCoin.symbol,
        "sendamount": parseFloat(this.sendingAmountC),
        "recvamount": parseFloat(this.receivingAmountC)
      })
      .subscribe(
        data => {
          let res:any = data;
          if(res.status == "SUCCESS" )  {
            this.marketInfo.ex_sendingAmountC = this.sendingAmountC;
            this.marketInfo.ex_receivingAmountC = this.receivingAmountC;
            this.marketInfo.ex_sendingAmountU = this.sendingAmountU;
            this.marketInfo.ex_receivingAmountU = this.receivingAmountU;
            
            this.marketInfo.exchange_step ++;  
            this.marketInfo.exchange_id = res.exchange_id;
            if(!this.marketInfo.exchange_refresh_timerid) {
              this.marketInfo.exchange_refresh_timerid = setInterval(()=>{
                this.refreshExchangeStep();
              }, 10000);       
            }
          } else {
            this.marketInfo.exchange_step = 4;    
          }
        },
        error => {
          this.marketInfo.exchange_step = 4;  
        }
      );           
    }
  }

  private refreshExchangeStep() {
    this.http.get(this._baseURL + '/market/exchange_step?exchangeid=' + this.marketInfo.exchange_id + '&userid=' + this.userInfo.userid)
    .subscribe(
      data => {
        let res: any = data;
        if(res.status == "SUCCESS" )  {
          this.marketInfo.exchange_step = res.step;
          if(this.marketInfo.exchange_step==3) clearInterval(this.marketInfo.exchange_refresh_timerid);
        }
    });
  }

  endExchange(){
    this.marketInfo.exchange_step = 0;
    this.sendingAmountC = '0.00';
    this.sendingAmountU = '0.00';
    this.receivingAmountC = '0.00'; 
    this.receivingAmountU = '0.00';
    this.marketInfo.ex_sendingAmountC = '0.00';
    this.marketInfo.ex_receivingAmountC = '0.00';
    this.marketInfo.ex_sendingAmountU = '0.00';
    this.marketInfo.ex_receivingAmountU = '0.00';
  }
}
