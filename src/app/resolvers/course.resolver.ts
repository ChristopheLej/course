import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Course } from '@models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { loadCourse } from '@store/actions/course.actions';
import { tap, filter, first } from 'rxjs/operators';
import { selectCourseById } from '@store/selectors/course.selector';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private store: Store<ApplicationState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    console.log('CourseResolver');
    const id = route.params['id'];

    return this.store.pipe(
      select(selectCourseById(id)),
      tap(course => {
        if (!course) {
          this.store.dispatch(loadCourse({ courseId: id }));
        }
      }),
      filter(course => !!course),
      first()
    );
  }
}
