import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Buy-Bulk'
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
