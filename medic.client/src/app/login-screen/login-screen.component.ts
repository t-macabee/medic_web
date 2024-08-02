import {Component} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BusyService} from "../services/busy.service";


@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
  model: any = {};

  constructor(private accountService: AccountService, private router: Router, private busyService: BusyService) {
  }

  login() {
    this.busyService.busy(); // Show spinner
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/home').then(() => {
          this.busyService.idle(); // Hide spinner after navigation
        });
        this.model = {};
      },
      error: _ => {
        this.busyService.idle(); // Hide spinner on error
      }
    });
  }
}
