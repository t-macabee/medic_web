import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setMainPhoto(memberId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'Photo/set-main/' + memberId + '/' + photoId, {});
  }

  deletePhoto(memberId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'Photo/delete-photo/' + memberId + '/' + photoId, {} );
  }
}
