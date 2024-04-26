import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CoinFacade } from '../state/coin.facade';
import { Coin, Column } from '../state/model/coin.interfaces';
import { CoinComponent } from '../coin/coin.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'crypto-coin-tracker-coin-container',
  standalone: true,
  imports: [CommonModule, CoinComponent, SpinnerComponent],
  templateUrl: './coin-container.component.html',
  styleUrl: './coin-container.component.scss'
})
export class CoinContainerComponent implements OnInit, OnDestroy {
  coinService = inject(CoinService);
  readonly STYLE: { [key: string]: any } = { 'width': '3rem', 'height': '3rem' };
  coinData: Coin[] = [];
  origCols:Column[] = [
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
  coinFacade = inject(CoinFacade);
  loading$ = this.coinFacade.coinDataLoading$;
  coinData$ = this.coinFacade.coinData$;
  readonly destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.coinFacade.loadCoinData();
    this.coinData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.coinData = data;
    })
  }
  ngOnDestroy(): void {
    this.coinData = [];
    this.destroy$.next();
    this.destroy$.complete();
  }
}
