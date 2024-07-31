import {Routes} from '@angular/router';
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {CoverPageComponent} from "./cover-page/cover-page.component";

export const routes: Routes = [
  { path: '', component: CoverPageComponent }, // Default route
  { path: 'home', component: HomeScreenComponent }, // Home route
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
