import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {User} from "../models/user";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:44355/api/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User)  => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.toastr.clear();
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
