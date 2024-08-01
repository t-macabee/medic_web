import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {map, tap} from "rxjs";

export const AuthGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);


  return accountService.currentUser$.pipe(
    map(user => {
      return !!user;
    }),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
      }
    })
  );
};
