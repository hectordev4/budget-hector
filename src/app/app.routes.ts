import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview').then(c => c.Overview)
  },
  {
    path: 'pressupost/:id',
    loadComponent: () => import('./features/quote-detail/quote-detail').then(c => c.QuoteDetail)
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];