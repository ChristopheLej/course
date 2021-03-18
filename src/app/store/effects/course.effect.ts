import { Injectable } from '@angular/core';
import { CourseService } from '@services';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  tap,
  exhaustMap,
  withLatestFrom,
  filter,
  mergeMap
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import * as fromAction from '@store/actions/course.actions';

import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { allCoursesLoaded, selectCourses } from '@store/selectors/course.selector';

@Injectable()
export class CourseEffects {
  constructor(
    private service: CourseService,
    private actions$: Actions,
    private store: Store<ApplicationState>
  ) {}

  loadAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.loadCourses),
      tap(action => console.log('loadAllCourses', action)),
      withLatestFrom(this.store.select(selectCourses)),
      // filter(([action, loaded]) => !loaded),
      switchMap(() => {
        // if (!loaded) {
        return this.service.findAllCourses().pipe(
          map(courses => fromAction.successLoadCourses({ courses })),
          catchError(err => of(fromAction.errorLoadCourses(err)))
        );
        // } else {
        //   return of(new EmptyLoadCourses());
        // }
      })
    )
  );

  loadCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.loadCourse),
      // tap(action => console.log(action)),
      mergeMap(action => this.service.findCourseById(action.courseId)),
      map(course => fromAction.successLoadCourse({ course })),
      catchError(err => of(fromAction.errorLoadCourse(err)))
    )
  );

  // @Effect() UpdateCourse = this.actions$.pipe(
  //   ofType<UpdateCourse>(CourseActionTypes.UpdateCourse),
  //   tap(action => console.log(action)),
  //   switchMap(action =>
  //     this.service.saveCourse(action.payload.id, action.payload.changes).pipe(
  //       map(
  //         course =>
  //           new SuccessUpdateCourse({
  //             id: action.payload.id,
  //             changes: action.payload.changes
  //           })
  //       ),
  //       catchError(err => of(new ErrorUpdateCourse(err)))
  //     )
  //   )
  // );

  UpdateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.updateCourse),
      // tap(action => console.log(action)),
      exhaustMap(action =>
        this.service.saveCourse(action.id, action.changes).pipe(
          map(() =>
            fromAction.successUpdateCourse({
              id: action.id,
              changes: action.changes
            })
          ),
          catchError(err => of(fromAction.errorUpdateCourse(err)))
        )
      )
    )
  );
}
