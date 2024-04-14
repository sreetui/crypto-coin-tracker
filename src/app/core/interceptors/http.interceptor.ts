import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  if (url.includes("v1/cryptocurrency/listings/latest")) {
    console.log("url=", url);
    const key = "X-CMC_PRO_API_KEY";
    const reqWithHeader = req.clone({
      headers: req.headers.set(key, environment.api.coin.header[key]),
    });
    return next(reqWithHeader);
  }

  return next(req);
};
