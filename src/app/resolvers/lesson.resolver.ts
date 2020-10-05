import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Lesson } from '@models';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromSelector from '@store/selectors/lesson.selector';
import * as fromAction from '@store/actions/lesson.actions';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { PageQuery } from '@utils';

@Injectable()
export class LessonResolver implements Resolve<Lesson[]> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Lesson[] | Observable<Lesson[]> | Promise<Lesson[]> {
    console.log('LessonResolver');
    const courseId = route.params['id'];
    // const page = route.params['page'];

    const page: PageQuery = {
      pageIndex: 0,
      pageSize: 3
    };

    return this.store.pipe(
      select(fromSelector.selectLessonsPage(courseId, page)),
      tap(lessons => {
        if (lessons.length === 0) {
          this.store.dispatch(fromAction.loadLessonsRequested({ courseId, page }));
        }
      }),
      first()
    );
  }
}
