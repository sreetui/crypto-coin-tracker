import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Coin, Column } from '../state/model/coin.interfaces';
import { TableModule } from 'primeng/table'
import { StyleClassModule } from 'primeng/styleclass';
import { SignDirective } from './sign.directive';
import { CoinWsService } from '../services/coin-ws.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CoinService } from '../services/coin.service';
@Component({
  selector: 'crypto-coin-tracker-coin',
  standalone: true,
  imports: [CommonModule, TableModule, StyleClassModule, SignDirective],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.scss'
})
export class CoinComponent implements OnInit, AfterViewInit, OnDestroy {

  loading = true;
  coinWsService = inject(CoinWsService);
  coinService = inject(CoinService);
  coinPricesFromBinanceWS$ = this.coinWsService.coinPricesFromBinanceWS$;
  coinPricesFromBinanceWSSubscribe!: Subscription;
  readonly destroy$ = new Subject<void>();
  @Input("data") coinInputData: Coin[] = [];
  @Input("origCols") origCols: Column[] = [];
  cols!: Column[];
  readonly NUMBER_FIELDS = ["percentChange1hr", "percentChange24hr", "percentChange7d", "volume24hr", "marketCap", "circulatingSupply"];
  readonly SORT_FIELDS = ["cmcRank", ...(this.NUMBER_FIELDS.slice(0, -1))];
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
    return streamPath;
  })
  ngOnInit(): void {
    const mobile = this.coinService.isMobile();
    this.cols = this.coinService.getColumnsByDevice(this.origCols, mobile);
    if (mobile) {
      this.setForMobileDevice();
    } 
    this.coinData.set(this.coinInputData.map(c => {
      const newCoin = { ...c, price: signal<number>(0), priceChangeCss: signal<string>("") };
      newCoin.price.set(<number>c.price);
      return newCoin;
    }));
    this.loading = false;
  }

  ngAfterViewInit(): void {
    this.coinPricesFromBinanceWS$.pipe(takeUntil(this.destroy$)).subscribe((coinPrices) => {
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
    this.coinWsService.createWS(this.wsStreamPath());
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    const widthLT600 =  width <= 600;
    this.cols = this.coinService.getColumnsByDevice(this.origCols, widthLT600);
    if (widthLT600) {
      this.setForMobileDevice();
    } else {
      this.tableMinWidth.set({ 'min-width': '100rem' });
      this.isMobile.set(false);
    }
  }

  setForMobileDevice() {
    this.isMobile.set(true);
    this.tableMinWidth.set({ 'min-width': 'auto' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
