import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Coin } from "./model/coin.interfaces";
import { coinActions } from "./coin.actions";

export interface CoinReducer {
    coinData: Coin[]
    loading: Boolean | null;
    success: Boolean | null;
    failure: string | null;
}

const initialState: CoinReducer = {
    coinData: [],
    loading: null,
    success: null,
    failure: null
};
export const coinFeature = createFeature({
    name: "Payment",
    reducer: createReducer<CoinReducer>(
        initialState,
        on(coinActions.loadCoinData, (state, {})=>{
            return {
                ...state,
                success:null,
                failure: null,
                loading: true
            }
        }),
        on(coinActions.loadCoinDataSuccess, (state, {response})=>{
            return {
                ...state,
                coinData: response,
                success:true,
                failure: null,
                loading: false
            }
        }),
        on(coinActions.loadCoinDataFailure, (state, {error})=>{
            return {
                ...state,
                coinData: [],
                success:null,
                failure: error,
                loading: false
            }
        })
    )
}) 