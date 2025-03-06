import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth/auth.guard';

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
      title: 'Admin',
      canActivate: [authGuard] 
    },
    {
      path: '**', redirectTo: '', pathMatch: 'full'
    }
  ];
