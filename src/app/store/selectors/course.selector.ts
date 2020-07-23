import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCourses from '../reducers/course.reducer';
import { CourseState } from '../reducers/course.reducer';

export const selectCourseState$ = createFeatureSelector<CourseState>(fromCourses.coursesFeatureKey);

export const selectCourses = createSelector(selectCourseState$, fromCourses.selectAll);

const selectSpecificCourses = (category: string) =>
  createSelector(selectCourses, courses => courses.filter(course => course.category === category));

export const selectBeginnerCourses = selectSpecificCourses('BEGINNER');

export const selectAdvancedCourses = selectSpecificCourses('ADVANCED');

export const selectIntermediateCourses = selectSpecificCourses('INTERMEDIATE');

export const selectCourseById = (id: number) =>
  createSelector(selectCourseState$, courseState => courseState.entities[id]);

export const selectPromoTotal = createSelector(
  selectCourses,
  courses => courses.filter(course => course.promo).length
);

export const allCoursesLoaded = createSelector(selectCourseState$, state => state.loaded);

export const isLoading = createSelector(selectCourseState$, state => state.loading);
