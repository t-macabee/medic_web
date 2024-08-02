import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../../services/shared.service";
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
export class CreateMemberComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private accountService: AccountService,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateMemberComponent>,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getOrder();
  }

  initializeForm() {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      orders: [{ value: '', disabled: true }],
      imageUrl: [''],
      dateOfBirth: ['', [Validators.required, this.ageValidator()]]
    }, { validators: this.passwordMatchValidator });
  }

  getOrder() {
    this.accountService.getOrder().subscribe({
      next: (order: number) => {
        this.createForm.patchValue({ orders: order });
      },
      error: (err: any) => {
        console.error('Error fetching order:', err);
      }
    });
  }

  save() {
    if (this.createForm.invalid) {
      return;
    }

    const formData = this.createForm.getRawValue();

    this.accountService.register(formData).subscribe({
      next: (user: Member) => {
        this.toastr.success('User created successfully!');
        this.sharedService.addMember(user);
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.toastr.error('Failed to create user. Please try again.');
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  private ageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const dob = new Date(control.value);
        const age = this.calculateAge(dob);
        if (age < 18) {
          return { 'underage': true };
        }
      }
      return null;
    };
  }

  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { 'mismatch': true };
  }
}
