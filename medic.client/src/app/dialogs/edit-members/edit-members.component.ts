import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MembersService} from "../../services/members.service";
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-edit-members',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-members.component.html',
  styleUrl: './edit-members.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class EditMembersComponent implements OnInit {
  editForm: FormGroup;
  member: any;
  initialValues: any;

  constructor(
    private memberService: MembersService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditMembersComponent>,
    @Inject(MAT_DIALOG_DATA) data: { member: any }
  ) {
    this.member = data.member;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [{ value: this.member.id, disabled: true }],
      name: [this.member.name, Validators.required],
      username: [this.member.username, Validators.required],
      dateOfBirth: [{ value: this.member.dateOfBirth, disabled: true }],
      orders: [{ value: this.member.orders, disabled: true }],
      lastLogin: [{ value: this.member.lastLogin, disabled: true }],
      status: [{ value: this.member.status, disabled: false }]
    });

    this.initialValues = this.editForm.value;
  }

  save() {
    if (this.editForm.invalid) {
      this.toastrService.error('Please fill in all required fields.');
      return;
    }

    const currentValues = this.editForm.getRawValue();
    if (this.areValuesUnchanged(currentValues, this.initialValues)) {
      this.toastrService.info('No changes were made.');
      return;
    }

    this.memberService.editMember(this.member.id, currentValues).subscribe({
      next: (updatedMember) => {
        this.sharedService.updateMember(updatedMember);
        this.toastrService.success('Member updated successfully!');
      },
      error: (err) => {
        this.toastrService.error('Failed to update member!');
      }
    });
  }

  toggle() {
    const currentStatus = this.editForm.get('status')?.value;
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    this.editForm.patchValue({ status: newStatus });
  }

  close() {
    this.dialogRef.close();
  }

  private areValuesUnchanged(currentValues: any, initialValues: any): boolean {
    return JSON.stringify(currentValues) === JSON.stringify(initialValues);
  }
}

