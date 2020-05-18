import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  findAllCourses(): Observable<Course[]> {
    // tslint:disable-next-line: no-string-literal
    console.log('findAllCourses');
    return this.http.get('/api/courses').pipe(map(res => res['payload']));
  }
}
