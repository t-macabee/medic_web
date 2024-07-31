import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {AccountService} from "../services/account.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgIf,
    BsDropdownModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(public accountService: AccountService, private router: Router) {
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login').then(success => {}).catch(error => {});
  }
}
