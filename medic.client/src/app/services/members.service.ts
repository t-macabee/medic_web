import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../models/member";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'Users/get-all', this.getHttpOptions());
  }

  getMember(id: number) {
    return this.http.get<Member>(this.baseUrl + 'Users/details/' + id, this.getHttpOptions());
  }

  getHttpOptions() {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    };
  }
}
