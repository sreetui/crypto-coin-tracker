import { coinFeature } from "./coin.reducer";


const selectCoinData = coinFeature.selectCoinData;
const selectCoinDataSuccess = coinFeature.selectSuccess;
const selectCoinDataFailure = coinFeature.selectFailure;
const selectCoinDataLoading = coinFeature.selectLoading;

export const fromCoin = {
    selectCoinData,
    selectCoinDataSuccess,
    selectCoinDataFailure,
    selectCoinDataLoading
};
