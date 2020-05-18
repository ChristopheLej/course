import { AuthState, authReducer } from './reducers/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './effects/user.effect';
import { CourseState, courseReducer } from './reducers/course.reducer';
import { CourseEffects } from './effects/course.effect';

export interface ApplicationState {
  user: AuthState;
  course: CourseState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: authReducer,
  course: courseReducer
};

export const ApplicationEffects = [AuthEffects, CourseEffects];
