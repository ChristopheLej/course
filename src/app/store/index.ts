import { AuthState, authReducer } from './reducers/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './effects/user.effect';

export interface ApplicationState {
  user: AuthState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: authReducer
};

export const ApplicationEffects = [AuthEffects];
