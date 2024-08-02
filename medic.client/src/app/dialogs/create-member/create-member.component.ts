import {Component, Inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Member} from "../../models/member";

@Component({
  selector: 'app-create-member',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-member.component.html',
  styleUrl: './create-member.component.css'
})
export class CreateMemberComponent {
  registerForm: FormGroup
  maxDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<CreateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: Member }
  ) {}

  close() {
    this.dialogRef.close();
  }

  create() {

  }
}
