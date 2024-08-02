import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MembersService} from "../services/members.service";
import {Member} from "../models/member";
import {MatDialog} from "@angular/material/dialog";
import {MemberDetailsComponent} from "../dialogs/member-details/member-details.component";
import {SharedService} from "../services/shared.service";

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
  selectedMember: Member

  constructor(private membersService: MembersService, private sharedService: SharedService ,private dialog: MatDialog) { }

  ngOnInit() {
    this.loadMembers();
    this.loadSharedService();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: members => this.members = members
    })
  }

  loadSharedService(){
    this.sharedService.currentMember.subscribe(member => {
      if (member) {
        const index = this.members.findIndex(m => m.id === member.id);
        if (index !== -1) {
          this.members[index] = member;
        }
      }
    });
  }

  memberDetails(member: Member) {
    this.selectedMember = member;

    const dialogRef = this.dialog.open(MemberDetailsComponent, {
      data: { member: this.selectedMember },
      maxHeight: '90vh',
      maxWidth: '90vw',
      height: '400px',
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMembers();
      }
    });
  }
}
