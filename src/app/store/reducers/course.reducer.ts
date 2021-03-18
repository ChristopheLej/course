import { Course } from '@models';
import { CourseActions, CourseActionTypes } from '@store/actions/course.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionTypes, clearStore } from '@store/actions/clear.actions';
import { createReducer, on } from '@ngrx/store';
import * as fromActions from '@store/actions/course.actions';

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

export const reducer = createReducer(
  initialCourseState,
  // Load all courses
  on(fromActions.loadCourses, state => ({ ...state, loading: true })),
  on(fromActions.emptyLoadCourses, state => ({ ...state, loading: false })),
  on(fromActions.successLoadCourses, (state, action) =>
    adapter.addMany(action.courses, { ...state, loading: false, loaded: true })
  ),
  on(fromActions.errorLoadCourses, state => ({ ...state, loading: false })),
  // Load a course
  on(fromActions.loadCourse, state => ({ ...state, loading: false })),
  on(fromActions.successLoadCourse, (state, action) =>
    adapter.upsertOne(action.course, { ...state })
  ),
  on(fromActions.errorLoadCourse, state => ({ ...state })),
  // Update a course
  on(fromActions.successUpdateCourse, (state, action) => adapter.updateOne(action, { ...state })),
  // Clear state
  on(clearStore, () => adapter.removeAll(initialCourseState))
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
