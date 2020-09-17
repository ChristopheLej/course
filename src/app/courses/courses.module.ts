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
import { CourseResolver } from '@resolvers';
import { LessonEffects } from '@store/effects/lesson.effect';
import { LocalStorageService, CourseService } from '@services';
import { getCoursesConfig, COURSES_CONFIG_TOKEN } from '@store/config/course.config';
import { getLessonsConfig, LESSONS_CONFIG_TOKEN } from '@store/config/lesson.config';

export const coursesRoutes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: ':id',
    component: LessonsComponent,
    resolve: { course: CourseResolver, lesson: CourseResolver }
  }
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
    StoreModule.forFeature(fromCourse.coursesFeatureKey, fromCourse.reducer, COURSES_CONFIG_TOKEN),
    StoreModule.forFeature(fromLesson.lessonsFeatureKey, fromLesson.reducer, LESSONS_CONFIG_TOKEN),
    EffectsModule.forFeature([CourseEffects, LessonEffects])
  ],
  exports: [CoursesComponent, CourseDialogComponent],
  entryComponents: [CourseDialogComponent],
  providers: [
    CourseService,
    CourseResolver,
    LocalStorageService,
    // { provide: COURSES_LOCAL_STORAGE_KEY, useValue: '__courses_storage__' },
    // { provide: COURSES_STORAGE_KEYS, useValue: ['ids', 'entities'] },
    {
      provide: COURSES_CONFIG_TOKEN,
      deps: [LocalStorageService],
      useFactory: getCoursesConfig
    },
    {
      provide: LESSONS_CONFIG_TOKEN,
      deps: [LocalStorageService],
      useFactory: getLessonsConfig
    }
  ]
})
export class CoursesModule {}
