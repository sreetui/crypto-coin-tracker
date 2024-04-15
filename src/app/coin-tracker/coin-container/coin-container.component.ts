import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CoinFacade } from '../state/coin.facade';
import { Coin } from '../state/model/coin.interfaces';
import { CoinComponent } from '../coin/coin.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crypto-coin-tracker-coin-container',
  standalone: true,
  imports: [CommonModule, CoinComponent, SpinnerComponent],
  templateUrl: './coin-container.component.html',
  styleUrl: './coin-container.component.scss'
})
export class CoinContainerComponent implements OnInit, OnDestroy {
  readonly STYLE: { [key: string]: any } = { 'width': '3rem', 'height': '3rem' };
  coinData: Coin[] = [];
  coinFacade = inject(CoinFacade);
  loading$ = this.coinFacade.coinDataLoading$;
  coinData$ = this.coinFacade.coinData$;
  coinDataSubscribe!: Subscription;
  ngOnInit(): void {
    this.coinFacade.loadCoinData();
    this.coinDataSubscribe = this.coinData$.subscribe((data) => {
      this.coinData = data;
    })
  }
  ngOnDestroy(): void {
    this.coinData = [];
    if (this.coinDataSubscribe && this.coinDataSubscribe.unsubscribe) {
      this.coinDataSubscribe.unsubscribe()
    }
  }
}
