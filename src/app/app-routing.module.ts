import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import { LoginSignUpComponent } from './common/components/login-sign-up/login-sign-up.component';
const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  {path:"loginSignUp", component:LoginSignUpComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
