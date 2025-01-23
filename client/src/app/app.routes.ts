import { Routes } from '@angular/router';
import { AddPointComponent } from './add-point/add-point.component';
import { HomeComponent } from './home/home.component';
import { PointsComponent } from './points/view/points.component';

export const routes: Routes = [
  {
    path: '',
    component: PointsComponent
  },
  {
    path: 'kontakt',
    component: AddPointComponent
  },
  {
    path: 'o-aplikacji',
    component: HomeComponent
  },
];
