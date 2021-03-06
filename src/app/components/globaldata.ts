import { Injectable } from '@angular/core';

export class AppConstants {
  public static get baseURL(): string { return "http://localhost:2020"; }
}

@Injectable()
export class UserInfo {
  bLogined: boolean = false;
  username: string = '';
  userid: string = '';
}

@Injectable()
export class MarketInfo {
  market_rate: number = 0;
  market_refresh_timerid: any;
  exchange_refresh_timerid: any;
  exchange_id: string = '';
  exchange_step: number = 0;
  ex_sendingAmountC: string = '0.00';
  ex_receivingAmountC: string = '0.00';
  ex_sendingAmountU: string = '0.00';
  ex_receivingAmountU: string = '0.00';
}

@Injectable()
export class CoinInfo {
  getDataFromSymbol(symbol) {
    for(let i=0; i<this.data.length; i++) {
      if(this.data[i].symbol == symbol)
        return this.data[i];
    }
  }

  getCheckedCoins() {
    var validCoins = [];
    for(let i=0; i<this.data.length; i++) {
      if(this.data[i].checked)
        validCoins.push(this.data[i]);
    }
    return validCoins;
  }

  initBalance() {
    for(let i=0; i<this.data.length; i++) {
      this.data[i].balance = 0;
    }
  }

  dataIndex = {
    'BTC' : 0,
    'ETH' : 1,
    'LTC' : 2,
    'MOLK': 3,
    'BCH' : 4,
    'DASH': 5
  }

  data = [
    {
      index: 0,
      name:'Bitcoin',
      symbol:'BTC',
      market:'bitcoin',
      color:'#ea9914',
      textcolor:'#ffffff',
      icon:'./assets/BTC_Logo.png',
      description:'Bitcoin uses peer-to-peer technology to operate with no central authority or banks. Managing transactions,and the issuing of bitcoins,is carried out collectively by the network.',
      checked: true,
      price : 0,
      cap : 0,
      volume24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      address: '',
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
      site: 'coincap'
    },
    {
      index: 1,
      name:'Ethereum',
      symbol:'ETH',
      market:'ethereum',
      color:'#627eea',
      textcolor:'#ffffff',
      icon:'./assets/ETH_Logo.png',
      description:'Ethereum is a decentralized platform that runs smart contracts:applications that run exactly as programmed without any possibility of downtown,censorship,fraud or third party interference.',
      checked: true,
      price : 0,
      cap : 0,
      volume24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      address: '',
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
      site: 'coincap'
    },
    {
      index: 2,
      name:'Litecoin',
      symbol:'LTC',
      market:'litecoin',
      color:'#989898',
      textcolor:'#ffffff',
      icon:'./assets/LTC_Logo.png',
      description:'Litecoin provides fast,2.5 minute transaction confirmations and uses scrypt-based proof-of-work to target everyday computers.Litecoin is often considered the silver to Bitcoin gold.',
      checked: true,
      price : 0,
      cap : 0,
      volume24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      address: '',
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
      site: 'coincap'
    },
    {
      index: 3,
      name:'MobilinkToken',
      symbol:'MOLK',
      market:'mobilinktoken',
      color:'#f1f1f1',
      textcolor:'#1d2b3a',
      icon:'./assets/MOLK_Logo.png',
      description:'Mobilink Token: Is a decentralized token, where you can send/receive, interact and transact via multiple exchanges and communication platforms. Mobilink Token is designed so MOLK rewards can be earned via proof of participation throughout multiple social networking, and communication platforms.',
      checked: true,
      price : 0,
      cap : 0,
      volume24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      address: '',
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
      site: 'cryptocompare'
    }
    /*{
      index: 4,
      name:'Bitcoin Cash',
      symbol:'BCH',
      market:'bitcoin cash',
      color:'#8dc351',
      icon:'./assets/bitcoin_cash_logo.png',
      description:'Bitcoin Cash is a hard-forked version of Bitcoin. It is similar to the Bitcoin protocol,however differences are defined in blocksize limits and difficulty adjustments.',
      checked: false,
      price : 0,
      cap : 0,
      volume24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      address: '',
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
      site: 'coincap'
    },
    {
      index: 5,
      name:'Dash',
      symbol:'DASH',
      market:'dash',
      color:'#1c75bc',
      icon:'./assets/dashcoin_logo.png',
      description:'DASH aims to be privacy-centric with unlinkable transactions using the PrivateSend System.Blockchain governance is carried out via MasterNode system.',
      checked: true,
      price : 0,
      cap : 0,
      volume24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      address: '',
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
      site: 'coincap'
    }*/    
  ]
}
