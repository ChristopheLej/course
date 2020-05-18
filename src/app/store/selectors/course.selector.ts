import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { CourseState } from '@store/reducers/course.reducer';

export const selectCourseState$ = (state: ApplicationState) => state.course;

export const selectCourses$ = createSelector(selectCourseState$, state => state.courses);

export const selectBeginnerCourses$ = createSelector(selectCourses$, courses =>
  courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses$ = createSelector(selectCourses$, courses =>
  courses.filter(course => course.category === 'ADVANCED')
);
