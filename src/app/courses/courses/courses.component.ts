import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@models';
import { LoadCourses, CourseActionTypes, ErrorUpdateCourse } from '@store/actions/course.actions';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import {
  selectCourses,
  selectBeginnerCourses,
  selectAdvancedCourses,
  selectIntermediateCourses,
  selectPromoTotal
} from '@store/selectors/course.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { coursesFeatureKey } from '@store/reducers/course.reducer';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allCourses: Course[];
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  intermediateCourses$: Observable<Course[]>;
  selectPromoTotal$: Observable<number>;

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {
    this.actions$.pipe(ofType(CourseActionTypes.ErrorUpdateCourse)).subscribe(action => {
      const response = (action as ErrorUpdateCourse).payload as HttpErrorResponse;
      this.snackBar.open(response.statusText, 'Error', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });

    this.actions$.pipe(ofType(CourseActionTypes.SuccessUpdateCourse)).subscribe(action => {
      this.snackBar.open('Course saved', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadCourses());
    this.store.pipe(select(selectCourses)).subscribe(courses => (this.allCourses = courses));
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.intermediateCourses$ = this.store.pipe(select(selectIntermediateCourses));
    this.selectPromoTotal$ = this.store.pipe(select(selectPromoTotal));
  }
}
