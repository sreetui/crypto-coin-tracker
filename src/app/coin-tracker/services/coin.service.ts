import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CoinResponse, Column } from '../state/model/coin.interfaces';
import { environment } from '../../../environments/environment';
import { WindowService } from '../../core/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  url = environment.api.coin.url;
  http = inject(HttpClient);
  windowService = inject(WindowService);
  loadLatestCoinData(): Observable<CoinResponse> {
    return this.http.get<CoinResponse>(this.url);
  }
  isMobile() {
    let mobile = false;
    if(this.windowService.window){
      mobile = (/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile/i.test(this.windowService.window.navigator.userAgent));
      console.log("isMobile=", mobile);
      return mobile;
    }
    return mobile;
  }
  
}
