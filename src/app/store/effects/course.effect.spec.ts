import { fakeAsync, TestBed } from '@angular/core/testing';
import { Course } from '@models';
import { provideMockActions } from '@ngrx/effects/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseService } from '@services';
import * as fromAction from '@store/actions/course.actions';
import * as fromSelector from '@store/selectors/course.selector';
import { ApplicationState } from '@storeConfig';
import { COURSES } from '@stubs/courses.stub';
import { of } from 'rxjs';

import { CourseEffects } from './course.effect';

describe('CourseEffect', () => {
  let store: MockStore;
  let mockSelectCoursesSelector: MemoizedSelector<ApplicationState, Course[]>;
  let mockSelectCoursesLoadedSelector: MemoizedSelector<ApplicationState, Course[]>;
  let courseService: jasmine.SpyObj<CourseService> = jasmine.createSpyObj('CourseService', [
    'findCourseById',
    'findAllCourses',
    'saveCourse'
  ]);

  const createEffects = actions$ => {
    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: CourseService, useValue: courseService }
      ]
    });
    store = TestBed.inject(MockStore);
    mockSelectCoursesSelector = store.overrideSelector(fromSelector.selectCourses, COURSES);
    // mockSelectCoursesLoadedSelector = store.overrideSelector(fromSelector.allCoursesLoaded, []);
    return TestBed.inject(CourseEffects);
  };

  it('should be created', () => {
    const effects = createEffects(of(undefined));

    expect(effects).toBeTruthy();
  });

  describe('with success effect', () => {
    it('should fire with all courses', done => {
      courseService.findAllCourses.and.returnValue(of(COURSES));

      const actions$ = of(fromAction.loadCourses());
      const expectedAction = fromAction.successLoadCourses({ courses: COURSES });

      const effects = createEffects(actions$);

      effects.loadAllCourses$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });

    it('should fire with course by id', done => {
      const index = 3;
      const course = COURSES[index];
      courseService.findCourseById.and.returnValue(of(course));

      const actions$ = of(fromAction.loadCourse({ courseId: index }));
      const expectedAction = fromAction.successLoadCourse({ course });

      const effects = createEffects(actions$);

      effects.loadCourse$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });

    it('should fire with save course', done => {
      const index = 5;
      const course = COURSES[index];
      courseService.saveCourse.and.returnValue(of(course));

      const actions$ = of(
        fromAction.updateCourse({
          id: index,
          changes: { description: 'new description' }
        })
      );
      const expectedAction = fromAction.successUpdateCourse({
        id: index,
        changes: { description: 'new description' }
      });

      const effects = createEffects(actions$);

      effects.UpdateCourse$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });
  });

  // describe('with error effect', () => {
  //   it('should fire with all courses', fakeAsync(done => {
  //     courseService.findAllCourses.and.rejectWith(new Error('Fail') as never);

  //     const actions$ = of(fromAction.loadCourses());
  //     const expectedAction = fromAction.errorLoadCourses({ payload: 'Fail' });

  //     const effects = createEffects(actions$);

  //     effects.loadAllCourses$.subscribe(res => {
  //       expect(res).toEqual(expectedAction);
  //       done();
  //     });
  //   }));
  // });
});
