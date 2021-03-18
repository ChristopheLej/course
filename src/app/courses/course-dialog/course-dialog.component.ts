import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course, Theme } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { CourseService } from '@services';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import {
  successUpdateCourse,
  errorUpdateCourse,
  updateCourse
} from '@store/actions/course.actions';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  course: Course;

  constructor(
    private store: Store<ApplicationState>,
    private service: CourseService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;
    this.description = course.description;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      promo: [course.promo, []],
      longDescription: [course.longDescription, Validators.required]
    });

    // Sauvegarde à chaque changements
    // this.form.valueChanges
    //   .pipe(concatMap(formValue => this.service.saveCourse(course.id, formValue)))
    //   .subscribe(
    //     saveResult =>
    //       this.store.dispatch(new SuccessUpdateCourse({ id: course.id, changes: saveResult })),
    //     err => this.store.dispatch(new ErrorUpdateCourse(err))
    //   );
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  save() {
    // Test multiple click
    // this.store.dispatch(new UpdateCourse({ id: this.course.id, changes: this.form.value }));

    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }
}
