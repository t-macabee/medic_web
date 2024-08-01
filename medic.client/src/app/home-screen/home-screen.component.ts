import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MembersService} from "../services/members.service";
import {Member} from "../models/member";
import {MemberCardComponent} from "../members/member-card/member-card.component";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    MemberCardComponent
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit{
  members: Member[] = [];

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: members => this.members = members
    })
  }

}
