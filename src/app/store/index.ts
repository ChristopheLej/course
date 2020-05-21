import { AuthState, authReducer } from './reducers/user.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthEffects } from './effects/user.effect';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface ApplicationState {
  user: AuthState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: authReducer
};

export const ApplicationEffects = [AuthEffects];

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [storeFreeze]
  : [];
