import { Injectable } from '@angular/core';
import {Member} from "../models/member";
import {BehaviorSubject} from "rxjs";
import {MembersService} from "./members.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private memberSource = new BehaviorSubject<Member | null>(null);
  currentMember$ = this.memberSource.asObservable();

  private membersSource = new BehaviorSubject<Member[]>([]);
  currentMembers$ = this.membersSource.asObservable();

  constructor(private membersService: MembersService) {}

  updateMember(member: Member) {
    this.membersService.getMember(member.id).subscribe(
      updatedMember => {
        this.memberSource.next(updatedMember);
        const currentMembers = this.membersSource.getValue();
        const updatedMembers = currentMembers.map(m => m.id === updatedMember.id ? updatedMember : m);
        this.membersSource.next(updatedMembers);
      },
      error => {
        console.error('Error updating member:', error);
      }
    );
  }

  updateMembers(members: Member[]) {
    this.membersSource.next(members);
  }

  addMember(member: Member) {
    const currentMembers = this.membersSource.getValue();
    this.membersSource.next([...currentMembers, member]);
  }
}
