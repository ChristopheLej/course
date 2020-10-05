import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Lesson } from '@models';
import { PageQuery } from '@utils';

export enum LessonActionTypes {
  LoadLessonsRequested = '[Lesson] Load Lessons Requested',
  ErrorLoadLessons = '[Lesson] Error load Lessons',
  AddLessons = '[Lesson] Add Lessons'
}

export const loadLessonsRequested = createAction(
  LessonActionTypes.LoadLessonsRequested,
  props<{ courseId: number; page: PageQuery }>()
);

export const errorLoadLessons = createAction(
  LessonActionTypes.ErrorLoadLessons,
  props<{ payload: any }>()
);

export const addLessons = createAction(
  LessonActionTypes.AddLessons,
  props<{ lessons: Lesson[] }>()
);

export type LessonActions =
  | typeof loadLessonsRequested
  | typeof errorLoadLessons
  | typeof addLessons;
