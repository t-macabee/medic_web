import { Injectable } from '@angular/core';
import {Member} from "../models/member";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private memberSource = new BehaviorSubject<Member | null>(null);
  currentMember$ = this.memberSource.asObservable();

  private membersSource = new BehaviorSubject<Member[]>([]);
  currentMembers$ = this.membersSource.asObservable();

  constructor() { }

  updateMember(member: Member) {
    this.memberSource.next(member);
    const currentMembers = this.membersSource.getValue();
    const updatedMembers = currentMembers.map(m => m.id === member.id ? member : m);
    this.membersSource.next(updatedMembers);
  }

  updateMembers(members: Member[]) {
    this.membersSource.next(members);
  }

  addMember(member: Member) {
    const currentMembers = this.membersSource.getValue();
    this.membersSource.next([...currentMembers, member]);
  }

  getCurrentMembers(): Member[] {
    return this.membersSource.getValue();
  }
}
