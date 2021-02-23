import { AuthState, authReducer } from './reducers/user.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../utils/customSerializer';
import * as fromCourse from './reducers/course.reducer';
import * as fromLesson from './reducers/lesson.reducer';
import * as fromLayout from './reducers/layout.reducer';

export interface ApplicationState {
  user: AuthState;
  router: RouterReducerState<RouterStateUrl>;
  layout: fromLayout.State;
  // [fromCourse.coursesFeatureKey]: fromCourse.CourseState;
  // [fromLesson.lessonsFeatureKey]: fromLesson.LessonState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: authReducer,
  router: routerReducer,
  layout: fromLayout.reducer
  // [fromCourse.coursesFeatureKey]: fromCourse.reducer,
  // [fromLesson.lessonsFeatureKey]: fromLesson.reducer
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [storeFreeze]
  : [];
