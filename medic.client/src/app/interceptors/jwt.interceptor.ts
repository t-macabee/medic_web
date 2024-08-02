import {HttpInterceptorFn} from '@angular/common/http';
import {inject, PLATFORM_ID} from "@angular/core";
import {AccountService} from "../services/account.service";
import { switchMap, take} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return next(clonedRequest);
  }

  return accountService.currentUser$.pipe(
    take(1),
    switchMap(currentUser => {
      if (currentUser) {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
        return next(clonedRequest);
      } else {
        return next(req);
      }
    })
  );
};
