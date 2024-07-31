import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {Observable, of} from "rxjs";
import {User} from "../models/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cover-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cover-page.component.html',
  styleUrl: './cover-page.component.css'
})
export class CoverPageComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }
}
