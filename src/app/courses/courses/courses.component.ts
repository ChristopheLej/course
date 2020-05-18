import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@models';
import { LoadCourses } from '@store/actions/course.actions';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import {
  selectCourses$,
  selectBeginnerCourses$,
  selectAdvancedCourses$
} from '@store/selectors/course.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadCourses());
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses$));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses$));
  }
}
