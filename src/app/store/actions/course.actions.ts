import { Action } from '@ngrx/store';
import { Course } from '@models';

export enum CourseActionTypes {
  LoadCourses = '[Course] Load Courses',
  SuccessLoadCourses = '[Course] Success Load Courses',
  ErrorLoadCourses = '[Course] Error Load Courses',

  UpdateCourse = '[Course] Update Course',
  SuccessUpdateCourse = '[Course] Success Update Course',
  ErrorUpdateCourse = '[Course] Error Update Course'
}

export class LoadCourses implements Action {
  readonly type = CourseActionTypes.LoadCourses;
}

export class SuccessLoadCourses {
  readonly type = CourseActionTypes.SuccessLoadCourses;
  constructor(public payload: { courses: any }) {}
}

export class ErrorLoadCourses {
  readonly type = CourseActionTypes.ErrorLoadCourses;
  constructor(public payload: any) {}
}

export class UpdateCourse {
  readonly type = CourseActionTypes.UpdateCourse;
  constructor(public payload: { id: number; changes: Partial<Course> }) {}
}

export class SuccessUpdateCourse {
  readonly type = CourseActionTypes.SuccessUpdateCourse;
  constructor(public payload: { id: number; changes: Partial<Course> }) {}
}

export class ErrorUpdateCourse {
  readonly type = CourseActionTypes.ErrorUpdateCourse;
  constructor(public payload: any) {}
}

export type CourseActions =
  | LoadCourses
  | SuccessLoadCourses
  | ErrorLoadCourses
  | UpdateCourse
  | SuccessUpdateCourse
  | ErrorUpdateCourse;
