import { HttpClient, HttpHandler } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '@stubs/courses.stub';
import { LESSONS } from '@stubs/lessons.stub';
import { of } from 'rxjs';

import { CourseService } from './course.service';
import { Course } from '@models';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: CourseService;
  const apiUrl = '/api/courses';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all courses from API', fakeAsync(() => {
    service.findAllCourses().subscribe(result => expect(result).toEqual(COURSES));

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush({
      payload: COURSES
    });
  }));

  it('should get course by ID from API', fakeAsync(() => {
    let id = 5;

    service.findCourseById(id).subscribe(result => expect(result).toEqual(COURSES[id]));

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush({
      payload: COURSES[id]
    });
  }));

  it('should update course from API', fakeAsync(() => {
    let id = 6;

    service
      .saveCourse(id, { description: 'new description', category: 'category2' })
      .subscribe(result => expect(result).toEqual(COURSES[id]));

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ description: 'new description', category: 'category2' });

    req.flush({
      payload: COURSES[id]
    });
  }));

  it('should find Lessons for a course from API', fakeAsync(() => {
    const id = 3;

    const lessons = LESSONS.filter(l => l.courseId === id);

    service.findLessons(id).subscribe(result => expect(result).toEqual(lessons));

    const req = httpTestingController.expectOne(
      `/api/lessons?courseId=${id}&sortOrder=asc&pageNumber=0&pageSize=3`
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      payload: lessons
    });
  }));

  it('should find Lessons for a course with paging from API', fakeAsync(() => {
    const id = 3;
    const paging = 3;
    const size = 50;

    service.findLessons(id, paging, size).subscribe(result => result);

    const req = httpTestingController.expectOne(
      `/api/lessons?courseId=${id}&sortOrder=asc&pageNumber=${paging}&pageSize=${size}`
    );
    expect(req.request.method).toBe('GET');

    req.flush({});
  }));
});
