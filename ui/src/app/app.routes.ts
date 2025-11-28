import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'demo', 
    pathMatch: 'full' 
  },
  { 
    path: 'demo', 
    loadComponent: () => import('./features/demo/demo.component').then(m => m.DemoComponent)
  },
  { 
    path: 'pricing', 
    loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent)
  },
];
