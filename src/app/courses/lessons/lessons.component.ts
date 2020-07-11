import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '@models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { LessonsDataSource } from '@services';
import { PageQuery } from '@utils';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { selectLessonsLoading } from '@store/selectors/lesson.selector';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit, AfterViewInit {
  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ['seqNo', 'description', 'duration'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>) {}

  ngOnInit(): void {
    console.log(this.route);

    // tslint:disable-next-line: no-string-literal
    this.course = this.route.snapshot.data['course'];

    this.loading$ = this.store.pipe(select(selectLessonsLoading));

    this.dataSource = new LessonsDataSource(this.store);
    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 3
    };

    this.dataSource.loadLessons(this.course.id, initialPage);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadLessonsPage())).subscribe();
  }

  loadLessonsPage() {
    const newPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    this.dataSource.loadLessons(this.course.id, newPage);
  }
}
