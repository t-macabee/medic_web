import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {CoverPageComponent} from "./cover-page/cover-page.component";
import {AccountService} from "./services/account.service";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CoverPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    if(typeof window !== 'undefined' && localStorage) {
      const userString = localStorage.getItem('user');
      if (!userString) return;
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    } else {
      console.error('localStorage is not available');
    }
  }
}
