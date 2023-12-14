import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TableComponent } from './pages/table/table.component';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full',
      },
      {
        path: 'scroll',
        canActivate: [AuthGuard],
        component: ScrollComponent,
      },
      {
        path: 'table',
        canActivate: [AuthGuard],
        component: TableComponent,
      },
      {
        path: 'boards',
        canActivate: [AuthGuard],
        loadChildren: () => import('../boards/boards.module').then(m => m.BoardsModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
