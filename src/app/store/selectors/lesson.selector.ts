import * as fromLessons from '../reducers/lesson.reducer';
import { LessonState } from '../reducers/lesson.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageQuery } from '@utils';

export const selectLessonState = createFeatureSelector<LessonState>(fromLessons.lessonsFeatureKey);

export const selectLessons = createSelector(selectLessonState, fromLessons.selectAll);

export const selectLessonsPage = (courseId: number, page: PageQuery) =>
  createSelector(selectLessons, allLessons => {
    const start = page.pageIndex * page.pageSize;
    const end = start + page.pageSize;

    return allLessons.filter(lesson => lesson.courseId === courseId).slice(start, end);
  });

export const selectLessonsLoading = createSelector(
  selectLessonState,
  lessonState => lessonState.loading
);
