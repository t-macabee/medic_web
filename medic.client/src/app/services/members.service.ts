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

  editMember(id: number, userEdit: any) {
    return this.http.put<Member>(this.baseUrl + 'Users/edit/' + id, userEdit);
  }

}
