import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environment.development";
import {isPlatformBrowser} from "@angular/common";
import {Member} from "../models/member";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + 'Account/register', model).pipe(
      map((response: Member) => {
        return response;
      })
    );
  }

  getOrder(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'Account/order-number');
  }

  setCurrentUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSource.next(user);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.currentUserSource.next(null);
  }
}
