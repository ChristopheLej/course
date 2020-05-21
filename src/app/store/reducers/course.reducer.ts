import { Course } from '@models';
import { CourseActions, CourseActionTypes } from '@store/actions/course.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const coursesFeatureKey = 'courses';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCourseState: CourseState = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialCourseState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.LoadCourses:
      console.log('courseReducer - CourseActionTypes.LoadCourses');
      return { ...state, loading: true, loaded: false };

    case CourseActionTypes.SuccessLoadCourses:
      console.log('courseReducer - CourseActionTypes.SuccessLoadCourses', action.payload);
      return adapter.setAll(action.payload.courses, { ...state, loading: false, loaded: true });

    case CourseActionTypes.ErrorLoadCourses:
      console.log('courseReducer - CourseActionTypes.ErrorLoadCourses');
      return { ...state, loading: false, loaded: false };

    case CourseActionTypes.UpdateCourse:
      console.log('courseReducer - CourseActionTypes.UpdateCourse');
      return state;

    case CourseActionTypes.SuccessUpdateCourse:
      console.log('courseReducer - CourseActionTypes.SuccessUpdateCourse');
      return adapter.updateOne(action.payload, { ...state });

    case CourseActionTypes.ErrorUpdateCourse:
      console.log('courseReducer - CourseActionTypes.ErrorUpdateCourse', action.payload);
      return state;

    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
