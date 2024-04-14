import { WritableSignal } from "@angular/core";


export interface Coin {
    id: number,
    name: string,
    symbol: string,
    cmcRank: number,
    price: number | WritableSignal<number>,
    priceChangeCss: string | WritableSignal<string>,
    imageUrl: string,
    percentChange1hr: number,
    percentChange24hr: number,
    percentChange7d: number,
    marketCap: number,
    shortedMarketCap: string
    volume24hr: number,
    circulatingSupply: number,
    last7Days: string,
}

export interface CoinResponseStatus {
    errorCode: number;
    errorMessage: string;
}

export type Quote = {
    [key in "USD"]: {
        price: number;
        volume_change_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        market_cap: number;
    };
};
export interface CoinResponseData {
    id: number;
    name: string;
    symbol: string;
    max_supply: number;
    circulating_supply: number;
    cmc_rank: number;
    quote: Quote;
}

export interface CoinResponse {
    status: CoinResponseStatus;
    data: CoinResponseData[];
}

export interface Column {
    field: string;
    header: string;
}

export interface CoinFieldPrice{
    symbol: string;
    price: number;
}


