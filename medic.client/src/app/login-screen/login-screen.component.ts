import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/user";
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
export class LoginScreenComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/home').then(success => {}).catch(error => {});
      },
      error: error => console.log(error)
    })
  }
}
