import { Injectable } from '@angular/core';
import { CourseService } from '@services';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
  SuccessUpdateCourse
} from '@store/actions/course.actions';

@Injectable()
export class CourseEffects {
  constructor(private service: CourseService, private actions$: Actions, private router: Router) {}

  @Effect() Course$: Observable<CourseActions> = this.actions$.pipe(
    ofType<LoadCourses>(CourseActionTypes.LoadCourses),
    tap(action => console.log(action)),
    switchMap(action => this.service.findAllCourses()),
    map(courses => new SuccessLoadCourses({ courses })),
    catchError(err => of(new ErrorLoadCourses(err)))
  );

  @Effect() UpdateCourse = this.actions$.pipe(
    ofType<UpdateCourse>(CourseActionTypes.UpdateCourse),
    tap(action => console.log(action)),
    switchMap(action =>
      this.service.saveCourse(action.payload.id, action.payload.changes).pipe(
        map(
          course =>
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
