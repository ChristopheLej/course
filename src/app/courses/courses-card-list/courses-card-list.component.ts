import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@models';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '@courses/course-dialog/course-dialog.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { UpdateCourse } from '@store/actions/course.actions';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];

  constructor(private store: Store<ApplicationState>, private dialog: MatDialog) {}

  ngOnInit(): void {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.store.dispatch(new UpdateCourse({ id: course.id, changes: data }));
      }
    });
  }
}
