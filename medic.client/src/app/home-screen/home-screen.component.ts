import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../models/user";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit{
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /*this.getUsers();*/
  }

  getUsers() {
    this.http.get<User[]>('https://localhost:44355/api/Users/get-all').subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("Request complete!")
    });
  }

}
