import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Response {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      symbol: string;
      rate_float: number;
    };
    /*EUR: {
      symbol: string;
      rate_float: number;
    };*/
    BRL: {
      symbol: string;
      rate_float: number;
    };
  };
}

@Injectable()
export class BitcoinService {
  current: Response;
  list: Array<Response> = [];

  constructor(private http: HttpClient) {}

  update() {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.current = data;
        let current_usd = this.current.bpi.USD.rate_float;
        let current_brl = this.current.bpi.BRL.rate_float;
        let last_el = this.list[this.list.length - 1];
        if (last_el && this.list.length > 0) {
          if (
            last_el.bpi.USD.rate_float !== current_usd ||
            last_el.bpi.BRL.rate_float !== current_brl
          ) {
            this.list.push(data);
          }
        } else {
          this.list.push(data);
        }
      });
  }
}
