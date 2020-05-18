import { Course } from '@models';
import { CourseActions, CourseActionTypes } from '@store/actions/course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  loaded: boolean;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  loaded: false
};

export function courseReducer(state = initialCourseState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.LOAD_COURSES:
      console.log('courseReducer - CourseActionTypes.LOAD_COURSES');
      return { ...state, loading: true, loaded: false };

    case CourseActionTypes.SUCCESS_LOAD_COURSES:
      console.log('courseReducer - CourseActionTypes.SUCCESS_LOAD_COURSES', action.payload);
      return { ...state, courses: action.payload.courses, loading: false, loaded: true };

    case CourseActionTypes.ERROR_LOAD_COURSES:
      console.log('courseReducer - CourseActionTypes.ERROR_LOAD_COURSES');
      return { ...state, loading: false, loaded: false };

    default:
      return state;
  }
}
