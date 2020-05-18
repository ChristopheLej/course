import { Action } from '@ngrx/store';
import { Course } from '@models';

export enum CourseActionTypes {
  LOAD_COURSES = 'LOAD_COURSES',
  SUCCESS_LOAD_COURSES = 'SUCCESS_LOAD_COURSES',
  ERROR_LOAD_COURSES = 'ERROR_LOAD_COURSES'
}

export class LoadCourses implements Action {
  readonly type = CourseActionTypes.LOAD_COURSES;
}

export class SuccessLoadCourses {
  readonly type = CourseActionTypes.SUCCESS_LOAD_COURSES;
  constructor(public payload: { courses: any }) {}
}

export class ErrorLoadCourses {
  readonly type = CourseActionTypes.ERROR_LOAD_COURSES;
  constructor(public payload: any) {}
}

export type CourseActions = LoadCourses | SuccessLoadCourses | ErrorLoadCourses;
