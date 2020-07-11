import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent, CoursesCardListComponent, CourseDialogComponent } from '@courses/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from '@store/effects/course.effect';
import * as fromCourse from '@store/reducers/course.reducer';
import * as fromLesson from '@store/reducers/lesson.reducer';
import { Routes, RouterModule } from '@angular/router';
import { LessonsComponent } from './lessons/lessons.component';
import { CourseResolver } from '../resolver/course.resolver';
import { CourseService } from '../services/course.service';
import { LessonEffects } from '@store/effects/lesson.effect';

export const coursesRoutes: Routes = [
  { path: '', component: CoursesComponent },
  { path: ':id', component: LessonsComponent, resolve: { course: CourseResolver } }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesCardListComponent,
    CourseDialogComponent,
    LessonsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    StoreModule.forFeature(fromCourse.coursesFeatureKey, fromCourse.reducer),
    StoreModule.forFeature(fromLesson.lessonsFeatureKey, fromLesson.reducer),
    EffectsModule.forFeature([CourseEffects, LessonEffects])
  ],
  exports: [CoursesComponent, CourseDialogComponent],
  entryComponents: [CourseDialogComponent],
  providers: [CourseService, CourseResolver]
})
export class CoursesModule {}
