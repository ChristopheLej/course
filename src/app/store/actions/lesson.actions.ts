import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Lesson } from '@models';

export enum LessonActionTypes {
  LoadLessons = '[Lesson] Load Lessons',
  AddLesson = '[Lesson] Add Lesson',
  UpsertLesson = '[Lesson] Upsert Lesson',
  AddLessons = '[Lesson] Add Lessons',
  UpsertLessons = '[Lesson] Upsert Lessons',
  UpdateLesson = '[Lesson] Update Lesson',
  UpdateLessons = '[Lesson] Update Lessons',
  DeleteLesson = '[Lesson] Delete Lesson',
  DeleteLessons = '[Lesson] Delete Lessons',
  ClearLessons = '[Lesson] Clear Lessons'
}

export const loadLessons = createAction(
  LessonActionTypes.LoadLessons,
  props<{ lessons: Lesson[] }>()
);

export const addLesson = createAction(LessonActionTypes.AddLesson, props<{ lesson: Lesson }>());

export const upsertLesson = createAction(
  LessonActionTypes.UpsertLesson,
  props<{ lesson: Lesson }>()
);

export const addLessons = createAction(
  LessonActionTypes.AddLessons,
  props<{ lessons: Lesson[] }>()
);

export const upsertLessons = createAction(
  LessonActionTypes.UpsertLessons,
  props<{ lessons: Lesson[] }>()
);

export const updateLesson = createAction(
  LessonActionTypes.UpdateLesson,
  props<{ lesson: Update<Lesson> }>()
);

export const updateLessons = createAction(
  LessonActionTypes.UpdateLessons,
  props<{ lessons: Update<Lesson>[] }>()
);

export const deleteLesson = createAction(LessonActionTypes.DeleteLesson, props<{ id: string }>());

export const deleteLessons = createAction(
  LessonActionTypes.DeleteLessons,
  props<{ ids: string[] }>()
);

export const clearLessons = createAction(LessonActionTypes.ClearLessons);
