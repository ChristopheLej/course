import { Injectable } from '@angular/core';
import { AuthService } from '@services';
import {
  AuthActions,
  AuthActionTypes,
  SuccessLogin,
  ErrorLogin,
  Login,
  Logout
} from '@store/actions/user.actions';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { clearStore } from '@store/actions/clear.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private service: AuthService,
    private actions$: Actions,
    private router: Router,
    private store: Store<ApplicationState>
  ) {}

  @Effect() Login$: Observable<AuthActions> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN_USER),
    tap(action => console.log(action)),
    switchMap(action =>
      this.service.logIn(action.payload.email, action.payload.password).pipe(
        map(user => new SuccessLogin({ user })),
        catchError(err => of(new ErrorLogin(err)))
      )
    )
  );

  @Effect({ dispatch: false }) LogInSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SUCCESS_LOGIN_USER),
    tap(user => this.router.navigate(['courses']))
  );

  @Effect({ dispatch: false }) Logout$: Observable<AuthActions> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LOGOUT_USER),
    tap(() => this.store.dispatch(clearStore())),
    tap(() => this.router.navigateByUrl('/'))
  );
}
