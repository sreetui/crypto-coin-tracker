import { ApplicationConfig, CSP_NONCE } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { provideStore } from '@ngrx/store';
import { provideCoinStateConfig } from './coin-tracker/state/provideCoinState';
import { provideAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(),
      withInterceptors([httpInterceptor, loggingInterceptor])),
    provideAnimations(),
    provideStore(),
    provideCoinStateConfig,

  ]
};
