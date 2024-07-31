import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response; // Assign the response to the users property
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("Request complete!")
    });
  }
}
