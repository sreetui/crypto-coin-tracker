import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CoinFacade } from '../state/coin.facade';
import { Coin } from '../state/model/coin.interfaces';
import { CoinComponent } from '../coin/coin.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'crypto-coin-tracker-coin-container',
  standalone: true,
  imports: [CommonModule, CoinComponent, SpinnerComponent],
  templateUrl: './coin-container.component.html',
  styleUrl: './coin-container.component.scss'
})
export class CoinContainerComponent implements OnInit{
  readonly STYLE:{[key:string]: any} = {'width': '3rem', 'height': '3rem'};
  coinData: Coin[] = [];
  coinFacade = inject(CoinFacade);
  loading$ = this.coinFacade.coinDataLoading$;
  coinData$ = this.coinFacade.coinData$;
  ngOnInit(): void {
    this.coinFacade.loadCoinData();
    this.coinData$.subscribe((data)=>{
      this.coinData = data;
    })
  }
}
