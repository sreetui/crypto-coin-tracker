import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Coin } from "./model/coin.interfaces";


export const coinActions = createActionGroup({
    source:"Coin Tracker API",
    events:{
        "load coin data": emptyProps,
        "load coin data success": props<{response:Coin[]}>(),
        "load coin data failure": props<{error:string}>()
    }
})