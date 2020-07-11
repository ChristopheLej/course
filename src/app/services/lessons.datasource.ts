import { DataSource } from '@angular/cdk/table';
import { Lesson } from '@models';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PageQuery } from '@utils';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { selectLessonsPage } from '@store/selectors/lesson.selector';
import { tap, catchError } from 'rxjs/operators';
import { loadLessonsRequested } from '@store/actions/lesson.actions';

export class LessonsDataSource implements DataSource<Lesson> {
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private store: Store<ApplicationState>) {}

  loadLessons(courseId: number, page: PageQuery) {
    this.store
      .pipe(
        select(selectLessonsPage(courseId, page)),
        tap(lessons => {
          if (lessons.length > 0) {
            this.lessonsSubject.next(lessons);
          } else {
            this.store.dispatch(loadLessonsRequested({ courseId, page }));
          }
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[] | readonly Lesson[]> {
    console.log('Connecting data source');
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('Disconnecting data source');
    this.lessonsSubject.complete();
  }
}
