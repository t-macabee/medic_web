import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {EditMembersComponent} from "../edit-members/edit-members.component";
import {SharedService} from "../../services/shared.service";
import {Member} from "../../models/member";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class MemberDetailsComponent implements OnInit {
  member: any;

  constructor(
    private dialogRef: MatDialogRef<MemberDetailsComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) data: { member: Member },
    private dialog: MatDialog
  ) {
    this.member = data.member;
  }

  ngOnInit(): void {
    this.sharedService.currentMember$.subscribe((member: Member | null) => {
      if (member && member.id === this.member.id) {
        this.member = member;
      }
    });
  }

  editDetail() {
    console.log('MemberDetails - Before opening EditMembersComponent:', this.member.photoUrl);
    const dialogRef = this.dialog.open(EditMembersComponent, {
      data: { member: this.member },
      maxHeight: '90vh',
      maxWidth: '90vw',
      height: '450px',
      width: '850px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('MemberDetails - After EditMembersComponent closed:', result.photoUrl);
        this.member = result;
        this.sharedService.updateMember(result);
        this.dialogRef.close(this.member);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

