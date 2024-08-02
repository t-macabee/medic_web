import { Injectable } from '@angular/core';
import {Member} from "../models/member";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private memberSource = new BehaviorSubject<Member | null>(null);
  currentMember = this.memberSource.asObservable();

  constructor() { }

  updateMember(member: Member) {
    this.memberSource.next(member);
  }
}
