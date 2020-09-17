import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Course } from '@models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { LoadCourse } from '@store/actions/course.actions';
import { tap, filter, first } from 'rxjs/operators';
import { selectCourseById } from '@store/selectors/course.selector';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private store: Store<ApplicationState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    console.log('resolve');
    // this.store.select(selectCourses).pipe(
    //   map(data => {
    //     console.log(data);
    //     if (data.length === 0) {
    //       this.store.dispatch(new LoadCourses());
    //     }
    //   })
    // );

    // return this.store.pipe(select(selectCourses), take(1));

    // this.store.dispatch(new LoadCourses());
    // return this.action$.pipe(
    //   ofType<SuccessLoadCourses>(CourseActionTypes.SuccessLoadCourses),
    //   map(loadCourse => console.log(loadCourse.payload)),
    //   take(1)
    // );

    const id = route.params['id'];

    return this.store.pipe(
      select(selectCourseById(id)),
      tap(course => {
        if (!course) {
          this.store.dispatch(new LoadCourse({ courseId: id }));
        }
      }),
      filter(course => !!course),
      first()
    );
  }
}
