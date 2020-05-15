import { User } from '@models';
import { AuthActions, AuthActionTypes } from '@store/actions/user.action';

export interface AuthState {
  user: User;
  loggedIn: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  loading: false,
  loaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
      console.log('authReducer - AuthActionTypes.LOGIN_USER');
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case AuthActionTypes.SUCCESS_LOGIN_USER:
      console.log('authReducer - AuthActionTypes.SUCCESS_LOGIN_USER');
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true,
        loading: false,
        loaded: true
      };

    case AuthActionTypes.ERROR_LOGIN_USER:
      console.log('authReducer - AuthActionTypes.ERROR_LOGIN_USER');
      return {
        ...state,
        user: undefined,
        loggedIn: false,
        loading: false,
        loaded: false
      };

    case AuthActionTypes.LOGOUT_USER:
      console.log('authReducer - AuthActionTypes.LOGOUT_USER');
      return {
        ...state,
        user: undefined,
        loggedIn: false,
        loading: false,
        loaded: false
      };

    default:
      return state;
  }
}
