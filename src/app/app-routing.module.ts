import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: "register",
    loadChildren:() =>
      import('./pages/register/register.module').then((m) => m.RegisterModule)
  },

  { path: '', component: DashboardComponent,
    children: [
      {
        path: 'files',
        loadChildren: () => import('./pages/files/files.module').then((m) => m.FilesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./pages/tasks/tasks.module').then((m) => m.TasksModule)
      },
      {
        path: 'organizations',
        loadChildren: () => import('./pages/organizations/organizations.module').then((m) => m.OrganizationsModule)
      },
      {
        path: 'graphics',
        loadChildren: ()=> import('./pages/graphics/graphics.module').then((m)=> m.GraphicsModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    loadChildren: () =>
      import("./pages/not-found/not-found.module").then((m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
