import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@models';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];

  constructor() {}

  ngOnInit(): void {}
}
