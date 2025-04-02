import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/ui/login.component';
import { HomeComponent } from './modules/home/ui/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];
