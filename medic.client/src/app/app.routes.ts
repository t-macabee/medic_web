import {Routes} from '@angular/router';
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./errors/not-found/not-found.component";

export const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeScreenComponent
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];
