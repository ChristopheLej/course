import { AuthState, authReducer } from './reducers/user.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthEffects } from './effects/user.effect';
import { CourseState, courseReducer } from './reducers/course.reducer';
import { CourseEffects } from './effects/course.effect';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface ApplicationState {
  user: AuthState;
  course: CourseState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: authReducer,
  course: courseReducer
};

export const ApplicationEffects = [AuthEffects, CourseEffects];

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [storeFreeze]
  : [];
