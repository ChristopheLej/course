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
      console.log('reducer - LoadCourses');
      return { ...state, loading: true };

    case CourseActionTypes.EmptyLoadCourses:
      console.log('reducer - EmptyLoadCourses');
      return { ...state, loading: false };

    case CourseActionTypes.SuccessLoadCourses:
      return adapter.setAll(action.payload.courses, { ...state, loading: false, loaded: true });

    case CourseActionTypes.ErrorLoadCourses:
      return { ...state, loading: false, loaded: false };

    case CourseActionTypes.LoadCourse:
      return { ...state, loading: !state.loaded };

    case CourseActionTypes.SuccessLoadCourse:
      return adapter.addOne(action.payload.course, { ...state, loading: false, loaded: true });

    case CourseActionTypes.ErrorLoadCourse:
      return { ...state, loading: false, loaded: false };

    case CourseActionTypes.UpdateCourse:
      return state;

    case CourseActionTypes.SuccessUpdateCourse:
      return adapter.updateOne(action.payload, { ...state });

    case CourseActionTypes.ErrorUpdateCourse:
      return state;

    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
