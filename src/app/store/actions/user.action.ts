import { Action } from '@ngrx/store';
import { User } from '@models';

export enum AuthActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  SUCCESS_LOGIN_USER = 'SUCCESS_LOGIN_USER',
  ERROR_LOGIN_USER = 'ERROR_LOGIN_USER',

  LOGOUT_USER = 'LOGOUT_USER'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN_USER;
  constructor(public payload: { email: string; password: string }) {}
}

export class SuccessLogin {
  readonly type = AuthActionTypes.SUCCESS_LOGIN_USER;
  constructor(public payload: { user: User }) {}
}

export class ErrorLogin {
  readonly type = AuthActionTypes.ERROR_LOGIN_USER;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT_USER;
}

export type AuthActions = Login | SuccessLogin | ErrorLogin | Logout;
