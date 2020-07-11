import { AuthState, authReducer } from './reducers/user.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthEffects } from './effects/user.effect';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../utils/customSerializer';

export interface ApplicationState {
  user: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: authReducer,
  router: routerReducer
};

export const ApplicationEffects = [AuthEffects];

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [storeFreeze]
  : [];
