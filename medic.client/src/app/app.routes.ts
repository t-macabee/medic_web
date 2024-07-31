import {Routes} from '@angular/router';
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";

export const routes: Routes = [
  { path: '', component: LoginScreenComponent }, // Default route
  { path: 'home', component: HomeScreenComponent }, // Home route
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
