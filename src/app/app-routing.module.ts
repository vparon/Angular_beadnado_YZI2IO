import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './Guard/login.guard';

const routes: Routes = [
  { path: 'main', component: AppComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },

  {
    path: 'list',
    component: ListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'details/:id',
    component: AppComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent

  },

  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
