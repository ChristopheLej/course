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
  ErrorLoadCourses
} from '@store/actions/course.actions';

@Injectable()
export class CourseEffects {
  constructor(private service: CourseService, private actions$: Actions, private router: Router) {}

  @Effect() Course$: Observable<CourseActions> = this.actions$.pipe(
    ofType<LoadCourses>(CourseActionTypes.LOAD_COURSES),
    tap(action => console.log(action)),
    switchMap(action => this.service.findAllCourses()),
    map(courses => new SuccessLoadCourses({ courses })),
    catchError(err => of(new ErrorLoadCourses(err)))
  );
}
