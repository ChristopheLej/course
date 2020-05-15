import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesViewComponent } from '@courses/index';
import { AuthGuardService } from '@services';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesViewComponent, canActivate: [AuthGuardService] },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
