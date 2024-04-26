import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoinFieldPrice } from '../state/model/coin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoinWsService {

  private readonly delayTimeInSecs = 10000;
  private retryCounter = 1;
  private readonly maxRetries = 5;
  private wsStreamPath = "";
  coinPricesFromBinanceWS$ = new BehaviorSubject<CoinFieldPrice[]>([]);
  createWS(wsStreamPath: string) {
    this.wsStreamPath = wsStreamPath;
    try {
      let ws = new WebSocket(`wss://stream.binance.us:9443/stream?streams=${wsStreamPath}`);
      ws.onopen = (event) => {
        console.log("WS Stream opened, event=", event, new Date());
      }
      ws.onmessage = (event) => {
        console.log("WS Stream onmessage, event=", event, new Date());
        try {
          const data = JSON.parse(event.data);
          const [symbol, price] = [data.data['s'], data.data['p']];
          console.log("Symbol=", symbol, ", price=", price);
          this.coinPricesFromBinanceWS$.next([{ symbol: symbol.replace(/USDT/ig, ""), price: price }])
        } catch (error) {
          console.error("Error occurred in onMessage, error=", error);
          reEstablishConnection();
        }
      }
      ws.onclose = (event) => {
        console.log("WS Stream onclose, event=", event, new Date());
        try {
          reEstablishConnection();
        } catch (error) {
          console.error("Error occurred in onClose, error=", error);
          reEstablishConnection();
        }
      }
      const reEstablishConnection = () => {
        console.info("Re-establishing connection , counter=", this.retryCounter, ", dealyInSeconds=", this.delayTimeInSecs);
        if (this.retryCounter <= this.maxRetries) {
          setTimeout(() => {
            this.retryCounter++;
            this.createWS(this.wsStreamPath);
          }, this.delayTimeInSecs);
        } else {
          console.warn("Stop re-establishing websocket stream connection, please refresh the page");
        }
      }
    } catch (error) {
      console.error("Error on creating websocket=", error);
    }
  }

}
