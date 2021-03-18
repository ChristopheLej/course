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
    return this.http.get<Course>(`/api/courses/${id}`).pipe(map(res => res['payload']));
  }

  findAllCourses(): Observable<Course[]> {
    // tslint:disable-next-line: no-string-literal
    return this.http.get<Course[]>('/api/courses').pipe(map(res => res['payload']));
  }

  saveCourse(courseId: number, changes: Partial<Course>): Observable<Course> {
    return this.http.put('/api/courses/' + courseId, changes).pipe(map(res => res['payload']));
  }

  findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>('/api/lessons', {
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
