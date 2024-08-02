import {Component, Inject} from '@angular/core';
import {Member} from "../../models/member";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<MemberDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: Member }
  ) {}

  onClose() {
    this.dialogRef.close();
  }

  save() {

  }
}
