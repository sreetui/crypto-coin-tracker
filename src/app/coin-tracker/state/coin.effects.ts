import { Injectable, inject, signal } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CoinService } from '../services/coin.service';
import { coinActions } from './coin.actions';
import { Coin, CoinResponse, CoinResponseData } from './model/coin.interfaces';
import { environment } from '../../../environments/environment';

@Injectable()
export class CoinEffects {
  actions$ = inject(Actions);
  coinService = inject(CoinService);
  loadCoinData = createEffect(() => {
    return this.actions$.pipe(
      ofType(coinActions.loadCoinData),
      switchMap(() => {
        return this.coinService.loadLatestCoinData().pipe(
          map((response: CoinResponse) => {
            let data = response.data;
            const transformedCoinData: Coin[] = data.map((coinData: CoinResponseData) => {
              const quote = coinData.quote["USD"];
              return {
                id: coinData.id,
                name: coinData.name,
                symbol: coinData.symbol,
                imageUrl: `${environment.api.coin.imageBaseUrl}/static/img/coins/64x64/${coinData.id}.png`,
                cmcRank: coinData.cmc_rank,
                price: quote.price,
                percentChange1hr: quote.percent_change_1h,
                percentChange24hr: quote.percent_change_24h,
                percentChange7d: quote.percent_change_7d,
                marketCap: quote.market_cap,
                priceChangeCss: "",
                shortedMarketCap: (()=>{
                  const mc = Number(quote.market_cap.toFixed(0));
                  const mcs = mc.toString();
                  const mcsLength = mcs.length;
                  let smc = "";
                  if(mcsLength >= 13 && mcsLength <=15){
                    smc = `${(mc/1000000000000).toFixed(2)}T`;
                  }else if(mcsLength >= 10 && mcsLength <=12){
                    smc = `${(mc/1000000000).toFixed(2)}B`;
                  }else if(mcsLength >= 7 && mcsLength <=9){
                    smc = `${(mc/1000000).toFixed(2)}M`;
                  }
                  return smc;
                })(),
                volume24hr: quote.volume_change_24h,
                circulatingSupply: coinData.circulating_supply,
                last7Days: `${environment.api.coin.charImageBaseUrl}/generated/sparklines/web/7d/2781/1.svg`
              }
            });
            return coinActions.loadCoinDataSuccess({ response: transformedCoinData });
          }),
          catchError((error) => {
            return of(coinActions.loadCoinDataFailure(error.message));
          })
        )
      })
    )
  })

}
