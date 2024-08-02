import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Member} from "../models/member";


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
    return this.http.get<Member[]>(this.baseUrl + 'Users/get-all');
  }

  getMember(id: number) {
    return this.http.get<Member>(this.baseUrl + 'Users/details/' + id);
  }
}
