import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { coinActions } from "./coin.actions";
import { coinFeature } from "./coin.reducer";

@Injectable({
    providedIn:"root"
})

export class CoinFacade{
    private store = inject(Store);
    coinData$ = this.store.select(coinFeature.selectCoinData);
    coinDataSuccess$ = this.store.select(coinFeature.selectSuccess);
    coinDataFailure$ = this.store.select(coinFeature.selectFailure);
    coinDataLoading$ = this.store.select(coinFeature.selectLoading);

    loadCoinData(){
        this.store.dispatch(coinActions.loadCoinData());
    }
}