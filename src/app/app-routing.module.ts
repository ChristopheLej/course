import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@services';
import { LoginComponent } from '@components/login/login.component';
import { CoursesComponent } from './courses';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'courses', component: CoursesComponent, canActivate: [AuthGuardService] },
//   { path: '', component: LoginComponent }
// ];

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  { path: '', component: CoursesComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
