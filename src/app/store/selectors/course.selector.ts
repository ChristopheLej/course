import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCourses from '../reducers/course.reducer';
import { CourseState } from '../reducers/course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectCourses = createSelector(selectCourseState, fromCourses.selectAll);

export const selectBeginnerCourses = createSelector(selectCourses, courses =>
  courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(selectCourses, courses =>
  courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectCourses,
  courses => courses.filter(course => course.promo).length
);
