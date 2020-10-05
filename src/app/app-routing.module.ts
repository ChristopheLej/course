import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@services';
import { LoginComponent, AboutComponent, HomeComponent } from '@components';

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
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
