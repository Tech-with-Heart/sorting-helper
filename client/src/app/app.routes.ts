import { Routes } from '@angular/router';
import { AddPointComponent } from './add-point/add-point.component';
import { HomeComponent } from './home/home.component';
import { PointsComponent } from './points/points.component';

export const routes: Routes = [
  {
    path: '',
    component: PointsComponent
  },
  {
    path: 'dodaj-punkt',
    component: AddPointComponent
  },
  {
    path: 'o-aplikacji',
    component: HomeComponent
  },
];
