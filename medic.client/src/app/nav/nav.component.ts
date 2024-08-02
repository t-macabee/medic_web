import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {AccountService} from "../services/account.service";
import {Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateMemberComponent} from "../dialogs/create-member/create-member.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgIf,
    BsDropdownModule,
    AsyncPipe,
    RouterLink,
    MatButton
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  currentUser$: Observable<User | null>;

  constructor(private accountService: AccountService, private router: Router, private dialog: MatDialog) {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  addMember() {
    const dialog = this.dialog.open(CreateMemberComponent, {
      height: '600px',
      width: '500px',
      data : {}
    })
  }
}
