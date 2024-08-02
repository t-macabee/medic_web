import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {AccountService} from "./services/account.service";
import {User} from "./models/user";
import {NavComponent} from "./nav/nav.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {NgxSpinnerComponent} from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginScreenComponent, NavComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'medic.client';

  constructor(private accountService: AccountService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router) { }

  ngOnInit() {
    this.setCurrentUser();

  }

  setCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      if (!userString) {
        this.router.navigate(['/login']);
        return;
      }
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
      this.checkRedirect();
    }
  }

  checkRedirect() {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
