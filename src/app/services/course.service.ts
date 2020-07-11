import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course, Lesson } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  findCourseById(id: number): Observable<Course> {
    console.log('CourseService - findCourseById()');
    // tslint:disable-next-line: no-string-literal
    return this.http.get<Course>(`/api/courses/${id}`);
  }

  findAllCourses(): Observable<Course[]> {
    console.log('CourseService - findAllCourses()');
    // tslint:disable-next-line: no-string-literal
    return this.http.get('/api/courses').pipe(map(res => res['payload']));
  }

  saveCourse(courseId: number, changes: Partial<Course>) {
    return this.http.put('/api/courses/' + courseId, changes);
  }

  findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    console.log('findLessons');
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('sortOrder', 'asc')
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      })
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map(res => res['payload'])
      );
  }
}
