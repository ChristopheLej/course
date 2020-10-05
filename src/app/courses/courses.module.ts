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
import { storageMetaReducer } from '@store/reducers/storage.metareducer';
import { LocalStorageService } from '@services';
import { COURSES_LOCAL_STORAGE_KEY, COURSES_STORAGE_KEYS, COURSES_CONFIG_TOKEN } from './courses.tokens';

export const coursesRoutes: Routes = [
  { path: '', component: CoursesComponent },
  { path: ':id', component: LessonsComponent, resolve: { course: CourseResolver } }
];

export function getCoursesConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

@NgModule({
  declarations: [CoursesComponent, CoursesCardListComponent, CourseDialogComponent, LessonsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    StoreModule.forFeature(fromCourse.coursesFeatureKey, fromCourse.reducer, COURSES_CONFIG_TOKEN),
    StoreModule.forFeature(fromLesson.lessonsFeatureKey, fromLesson.reducer),
    EffectsModule.forFeature([CourseEffects, LessonEffects])
  ],
  exports: [CoursesComponent, CourseDialogComponent],
  entryComponents: [CourseDialogComponent],
  providers: [
    CourseService,
    CourseResolver,
    LocalStorageService,
    { provide: COURSES_LOCAL_STORAGE_KEY, useValue: '__courses_storage__' },
    { provide: COURSES_STORAGE_KEYS, useValue: ['ids', 'entities'] },
    {
      provide: COURSES_CONFIG_TOKEN,
      deps: [COURSES_STORAGE_KEYS, COURSES_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getCoursesConfig
    }
  ]
})
export class CoursesModule {}
