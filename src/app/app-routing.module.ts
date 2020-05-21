import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '@courses/index';
import { AuthGuardService } from '@services';
import { LoginComponent } from './login/login.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'courses', component: CoursesComponent, canActivate: [AuthGuardService] },
//   { path: '', component: LoginComponent }
// ];

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuardService]
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
