import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MembersService} from "../services/members.service";
import {Member} from "../models/member";
import {MatDialog} from "@angular/material/dialog";
import {MemberDetailsComponent} from "../dialogs/member-details/member-details.component";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit{
  members: Member[] = [];

  constructor(private membersService: MembersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: members => this.members = members
    })
  }

  details(member: Member) {
    const dialog = this.dialog.open(MemberDetailsComponent, {
      data: {member: member},
      maxHeight: '90vh',
      maxWidth: '90vw',
      height: '450px',
      width: '800px'
    });
  }
}
