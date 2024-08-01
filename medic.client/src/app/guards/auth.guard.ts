import {CanActivate, NavigationStart, Router} from '@angular/router';
import {map, Observable, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.toastr.clear();
      }
    });
  }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.toastr.error('You shall not pass!');
          return false;
        }
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
