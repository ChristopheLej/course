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

export const coursesRoutes: Routes = [{ path: '', component: CoursesComponent }];

@NgModule({
  declarations: [CoursesComponent, CoursesCardListComponent, CourseDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    StoreModule.forFeature(fromCourse.coursesFeatureKey, fromCourse.reducer),
    EffectsModule.forFeature([CourseEffects]),
    StoreModule.forFeature(fromLesson.lessonsFeatureKey, fromLesson.reducer)
  ],
  exports: [CoursesComponent, CourseDialogComponent],
  entryComponents: [CourseDialogComponent]
})
export class CoursesModule {}
