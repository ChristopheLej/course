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
import {
  CourseActions,
  CourseActionTypes,
  LoadCourses,
  SuccessLoadCourses,
  ErrorLoadCourses,
  UpdateCourse,
  ErrorUpdateCourse,
  SuccessUpdateCourse,
  LoadCourse,
  SuccessLoadCourse,
  ErrorLoadCourse
} from '@store/actions/course.actions';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { allCoursesLoaded } from '@store/selectors/course.selector';

@Injectable()
export class CourseEffects {
  constructor(
    private service: CourseService,
    private actions$: Actions,
    private store: Store<ApplicationState>
  ) {}

  @Effect() loadAllCourses$: Observable<CourseActions> = this.actions$.pipe(
    ofType<LoadCourses>(CourseActionTypes.LoadCourses),
    tap(action => console.log('loadAllCourses', action)),
    withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
    // filter(([action, loaded]) => !loaded),
    switchMap(action =>
      this.service.findAllCourses().pipe(
        map(courses => new SuccessLoadCourses({ courses })),
        catchError(err => of(new ErrorLoadCourses(err)))
      )
    )
  );

  @Effect() loadCourse$: Observable<CourseActions> = this.actions$.pipe(
    ofType<LoadCourse>(CourseActionTypes.LoadCourse),
    tap(action => console.log(action)),
    mergeMap(action => this.service.findCourseById(action.payload.courseId)),
    map(course => new SuccessLoadCourse({ course })),
    catchError(err => of(new ErrorLoadCourse(err)))
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

  @Effect() UpdateCourse$ = this.actions$.pipe(
    ofType<UpdateCourse>(CourseActionTypes.UpdateCourse),
    tap(action => console.log(action)),
    exhaustMap(action =>
      this.service.saveCourse(action.payload.id, action.payload.changes).pipe(
        map(
          () =>
            new SuccessUpdateCourse({
              id: action.payload.id,
              changes: action.payload.changes
            })
        ),
        catchError(err => of(new ErrorUpdateCourse(err)))
      )
    )
  );
}
