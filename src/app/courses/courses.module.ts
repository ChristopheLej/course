import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent, CoursesCardListComponent } from '@courses/index';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from '@store/reducers/course.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from '@store/effects/course.effect';

@NgModule({
  declarations: [CoursesComponent, CoursesCardListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('courses', courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ],
  exports: [CoursesComponent]
})
export class CoursesModule {}
