import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-task/create-task.component').then(
        (m) => m.CreateTaskComponent
      ),
  },
];
