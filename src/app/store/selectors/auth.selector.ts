import { createSelector } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';

export const selectUserState$ = (state: ApplicationState) => state.user;

export const selectUser = createSelector(selectUserState$, state => state.user);

export const isLoggedIn = createSelector(selectUserState$, state => state.loggedIn);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);
