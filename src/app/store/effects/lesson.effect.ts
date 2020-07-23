import { Injectable } from '@angular/core';
import { CourseService } from '@services';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Lesson } from '@models';
import { loadLessonsRequested, addLessons, errorLoadLessons } from '../actions/lesson.actions';
import { tap, exhaustMap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LessonEffects {
  constructor(private service: CourseService, private actions$: Actions) {}

  Lesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLessonsRequested),
      tap(action => console.log(action)),
      exhaustMap(({ courseId, page }) =>
        this.service.findLessons(courseId, page.pageIndex, page.pageSize).pipe(
          map((lessons: Lesson[]) => addLessons({ lessons })),
          catchError(err => of(errorLoadLessons({ payload: err })))
        )
      )
    )
  );
}
