import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MembersService} from "../services/members.service";
import {Member} from "../models/member";
import {MatDialog} from "@angular/material/dialog";
import {MemberDetailsComponent} from "../dialogs/member-details/member-details.component";
import {SharedService} from "../services/shared.service";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    DatePipe
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit {
  members: Member[] = [];
  selectedMember: Member;
  isDialogOpen = false;

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadMembers();
    this.sharedService.currentMembers$.subscribe(members => {
      this.members = members;
    });
  }

  loadMembers() {
    this.membersService.getCurrentUserId().subscribe(currentUserId => {
      this.membersService.getMembers().subscribe({
        next: members => {
          this.members = members.filter(member => member.id !== currentUserId);
          this.sharedService.updateMembers(this.members);
        }
      });
    });
  }

  memberDetails(member: Member) {
    if (this.isDialogOpen) return;
    this.isDialogOpen = true;
    this.selectedMember = member;

    const dialogRef = this.dialog.open(MemberDetailsComponent, {
      data: { member: this.selectedMember },
      maxHeight: '90vh',
      maxWidth: '90vw',
      height: '500px',
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      if (result) {
        this.loadMembers();
      }
    });
  }
}
