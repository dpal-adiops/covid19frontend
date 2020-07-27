import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './../auth/components/sign-in-page/sign-in-page.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: SignInPageComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
