import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class MemberDetailsComponent implements OnInit {
  editForm: FormGroup;
  member: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data: { member: any }
  ) {
    this.member = data.member;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [{value: this.member.id, disabled: true}],
      name: [this.member.name],
      username: [this.member.username],
      dateOfBirth: [this.member.dateOfBirth],
      orders: [this.member.orders],
      lastLogin: [this.member.lastLogin],
      status: [this.member.status]
    });
  }

  save() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.getRawValue());
    }
  }

  close() {
    this.dialogRef.close();
  }
}

