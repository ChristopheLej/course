import { Course } from '@models';
import { CourseActions, CourseActionTypes } from '@store/actions/course.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCourseState: CourseState = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function courseReducer(state = initialCourseState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.LOAD_COURSES:
      console.log('courseReducer - CourseActionTypes.LOAD_COURSES');
      return { ...state, loading: true, loaded: false };

    case CourseActionTypes.SUCCESS_LOAD_COURSES:
      console.log('courseReducer - CourseActionTypes.SUCCESS_LOAD_COURSES', action.payload);
      return adapter.setAll(action.payload.courses, { ...state, loading: false, loaded: true });

    case CourseActionTypes.ERROR_LOAD_COURSES:
      console.log('courseReducer - CourseActionTypes.ERROR_LOAD_COURSES');
      return { ...state, loading: false, loaded: false };

    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
