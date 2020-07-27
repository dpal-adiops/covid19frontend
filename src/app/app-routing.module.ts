import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { LoginFormComponent } from './modules/auth/components/login-form/login-form.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
      canLoad: [AuthGuard]
    },
    {
      path: 'state',
      component: CoursesComponent,
      canLoad: [AuthGuard]
    }]
  },
  { path: 'login', loadChildren: () => AuthModule },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
