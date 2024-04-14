import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Coin, Column } from '../state/model/coin.interfaces';
import { TableModule } from 'primeng/table'
import { StyleClassModule } from 'primeng/styleclass';
import { SignDirective } from './sign.directive';
import { CoinWsService } from '../services/coin-ws.service';
import { Subscription } from 'rxjs';
import { CoinService } from '../services/coin.service';
@Component({
  selector: 'crypto-coin-tracker-coin',
  standalone: true,
  imports: [CommonModule, TableModule, StyleClassModule, SignDirective],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.scss'
})
export class CoinComponent implements OnInit, AfterViewInit, OnDestroy {

  coinWsService = inject(CoinWsService);
  coinService = inject(CoinService);
  coinPricesFromBinanceWS$ = this.coinWsService.coinPricesFromBinanceWS$;
  coinPricesFromBinanceWSSubscribe!: Subscription;
  @Input("data") coinInputData: Coin[] = [];
  cols!: Column[];
  origCols!: Column[];
  readonly SORT_FIELDS = ["cmcRank", "price", "percentChange1hr", "percentChange24hr", "percentChange7d", "volume24hr", "marketCap"];
  readonly NUMBER_FIELDS = ["percentChange1hr", "percentChange24hr", "percentChange7d", "volume24hr", "marketCap"];
  coinData = signal<Coin[]>([]);
  tableMinWidth = signal({});
  isMobile = signal(true);
  wsStreamPath = computed<string>(() => {
    const length = this.coinData().length;
    let streamPath = this.coinData().reduce((accumulator, data, index) => {
      accumulator += `${data.symbol.toLowerCase()}usdt@trade`;
      if (index < length - 1) {
        accumulator += "/";
      }
      return accumulator;
    }, "");
    console.log("wsStreamPath=", streamPath);
    return streamPath;
  })
  ngOnInit(): void {
    this.coinData.set(this.coinInputData.map(c => {
      const newCoin = { ...c, price: signal<number>(0), priceChangeCss: signal<string>("") };
      newCoin.price.set(<number>c.price);
      return newCoin;
    }));
    this.origCols = [
      { field: 'cmcRank', header: '#' },
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'percentChange1hr', header: '1h %' },
      { field: 'percentChange24hr', header: '24h %' },
      { field: 'percentChange7d', header: '7d %' },
      { field: 'marketCap', header: 'Market Cap' },
      { field: 'volume24hr', header: 'Volume(24h)' },
      { field: 'circulatingSupply', header: 'Circulating Supply' },
      { field: 'last7Days', header: 'Last 7 Days' }
    ];
    this.cols = this.origCols;
    if (this.coinService.isMobile()) {
      this.onMobile();
    }
  }

  ngAfterViewInit(): void {
    this.coinPricesFromBinanceWSSubscribe = this.coinPricesFromBinanceWS$.subscribe((coinPrices) => {
      const coinData = this.coinData();
      coinPrices.forEach(coinPrice => {
        const cData = coinData.find(data => data["symbol"] === coinPrice['symbol']);
        if (cData) {
          const [currentPrice, newPrice] = [((cData.price) as WritableSignal<number>)(), coinPrice.price];
          if (newPrice > 0) {
            (cData.priceChangeCss as WritableSignal<string>).set(newPrice > currentPrice ? 'rise' : 'fall');
            ((cData.price) as WritableSignal<number>).set(coinPrice['price']);
          }
        }
      });
    })
    this.coinWsService.createWS(this.wsStreamPath())
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width <= 600) {
      this.onMobile();
    } else {
      this.cols = Array.from(this.origCols);
      this.tableMinWidth.set({ 'min-width': '100rem' });
      this.isMobile.set(false);
    }
  }

  onMobile() {
    this.cols = this.origCols.filter((col, index) => {
      return index < 3;
    })
    this.isMobile.set(true);
    this.tableMinWidth.set({ 'min-width': 'auto' });
  }

  ngOnDestroy(): void {
    if (this.coinPricesFromBinanceWSSubscribe && this.coinPricesFromBinanceWSSubscribe.unsubscribe) {
      this.coinPricesFromBinanceWSSubscribe.unsubscribe();
    }
  }

}
