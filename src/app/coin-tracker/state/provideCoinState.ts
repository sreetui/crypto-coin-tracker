import { provideState } from "@ngrx/store";
import { coinFeature } from "./coin.reducer";
import { provideEffects } from "@ngrx/effects";
import { CoinEffects } from "./coin.effects";
import { EnvironmentProviders } from "@angular/core";

export const provideCoinStateConfig:EnvironmentProviders[] = [ provideState(coinFeature), provideEffects(CoinEffects)];