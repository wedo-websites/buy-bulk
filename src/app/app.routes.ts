import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Buy-Bulk'
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login'
    },
    {
      path: 'admin',
      component: AdminComponent,
      title: 'Admin'
    },
    {
      path: '**', redirectTo: '', pathMatch: 'full'
    }
  ];
