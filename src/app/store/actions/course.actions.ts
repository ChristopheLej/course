import { createAction, props } from '@ngrx/store';
import { Course } from '@models';

export enum CourseActionTypes {
  LoadCourses = '[Course] Load Courses',
  EmptyLoadCourses = '[Course] Courses allready loaded',
  SuccessLoadCourses = '[Course] Success Load Courses',
  ErrorLoadCourses = '[Course] Error Load Courses',

  LoadCourse = '[Course] Load Course',
  SuccessLoadCourse = '[Course] Success Load Course',
  ErrorLoadCourse = '[Course] Error Load Course',

  UpdateCourse = '[Course] Update Course',
  SuccessUpdateCourse = '[Course] Success Update Course',
  ErrorUpdateCourse = '[Course] Error Update Course'
}

export const loadCourses = createAction(CourseActionTypes.LoadCourses);

export const emptyLoadCourses = createAction(CourseActionTypes.EmptyLoadCourses);

export const loadLessonsRequested = createAction(
  CourseActionTypes.SuccessLoadCourses,
  props<{ courses: Course[] }>()
);

export const successLoadCourses = createAction(
  CourseActionTypes.SuccessLoadCourses,
  props<{ courses: Course[] }>()
);

export const errorLoadCourses = createAction(
  CourseActionTypes.ErrorLoadCourses,
  props<{ payload: any }>()
);

export const loadCourse = createAction(CourseActionTypes.LoadCourse, props<{ courseId: number }>());

export const successLoadCourse = createAction(
  CourseActionTypes.SuccessLoadCourse,
  props<{ course: Course }>()
);

export const errorLoadCourse = createAction(
  CourseActionTypes.ErrorLoadCourse,
  props<{ payload: any }>()
);

export const updateCourse = createAction(
  CourseActionTypes.UpdateCourse,
  props<{ id: number; changes: Partial<Course> }>()
);

export const successUpdateCourse = createAction(
  CourseActionTypes.SuccessUpdateCourse,
  props<{ id: number; changes: Partial<Course> }>()
);

export const errorUpdateCourse = createAction(
  CourseActionTypes.ErrorUpdateCourse,
  props<{ payload: any }>()
);

export type CourseActions =
  | typeof loadCourse
  | typeof emptyLoadCourses
  | typeof successLoadCourse
  | typeof errorLoadCourse
  | typeof loadCourses
  | typeof successLoadCourses
  | typeof errorLoadCourses
  | typeof updateCourse
  | typeof successUpdateCourse
  | typeof errorUpdateCourse;
