import {Routes} from '@angular/router';
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeScreenComponent }
    ]
  },
  { path: 'login', component: LoginScreenComponent },
  { path: '**', component: NotFoundComponent }
];

