import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
    public dialogRef: MatDialogRef<CreateMemberComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getOrder();
  }

  initializeForm() {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      orders: [{ value: '', disabled: true }],
      photoUrl: [''],
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
      const passwordControl = this.createForm.get('password');
      const dateOfBirthControl = this.createForm.get('dateOfBirth');

      if (passwordControl?.hasError('minlength')) {
        this.toastr.error('Password must be at least 6 characters long.');
      }

      if (dateOfBirthControl?.hasError('ageError')) {
        this.toastr.error('You must be at least 18 years old.');
      }

      return;
    }


    const defaultImage = 'assets/user.png';

    const user = {
      ...this.createForm.value,
      photoUrl: defaultImage
    };

    this.accountService.register(user).subscribe({
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

  ageValidator() {
    return (control: AbstractControl) => {
      const dateOfBirth = new Date(control.value);
      const age = this.calculateAge(dateOfBirth);
      return age < 18 ? { ageError: true } : null;
    };
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { mismatch: true };
  }
}
