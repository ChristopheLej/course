import { TestBed } from '@angular/core/testing';
import { Course } from '@models';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseState, selectAll } from '@store/reducers/course.reducer';
import { ApplicationState } from '@storeConfig';
import { COURSES } from '@stubs/courses.stub';

import * as fromCourse from './course.selector';

describe('CourseSelectors', () => {
  const initialState: CourseState = {
    ids: COURSES.map(todo => todo.id),
    entities: COURSES.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
    loading: false,
    loaded: true
  };
  const categories = ['BEGINNER', 'ADVANCED', 'INTERMEDIATE'];

  describe('retrieved Courses by Categories', () => {
    it('should select all courses', () => {
      const result = fromCourse.selectCourses.projector(initialState);

      expect(result).toEqual(COURSES);
    });

    categories.forEach(category => {
      it(`should select all courses for ${category}`, () => {
        const filteredCourses = COURSES.filter(c => c.category === category);
        let result = [];
        switch (category) {
          case 'BEGINNER':
            result = fromCourse.selectBeginnerCourses.projector(COURSES);
            break;

          case 'ADVANCED':
            result = fromCourse.selectAdvancedCourses.projector(COURSES);
            break;

          case 'INTERMEDIATE':
            result = fromCourse.selectIntermediateCourses.projector(COURSES);
            break;
        }

        expect(result).toEqual(filteredCourses);
      });
    });
  });

  it('should select a course by Id', () => {
    const index = 7;
    const result = fromCourse.selectCourseById(COURSES[index].id).projector(initialState);
    expect(result).toEqual(COURSES[index]);
  });

  it('should return number of courses in promotion', () => {
    const result = fromCourse.selectPromoTotal.projector(COURSES);
    const filteredCourses = COURSES.filter(c => c.promo).length;

    expect(result).toEqual(filteredCourses);
  });

  it('should return loaded courses', () => {
    const result = fromCourse.allCoursesLoaded.projector(initialState);
    expect(result).toEqual(selectAll);

    const emptyResult = fromCourse.allCoursesLoaded.projector({ ...initialState, loaded: false });
    expect(emptyResult).toEqual([]);
  });

  it('should return if state is loading', () => {
    const resultFalsy = fromCourse.isLoading.projector(initialState);
    expect(resultFalsy).toBeFalse();

    const resultTruthy = fromCourse.isLoading.projector({ ...initialState, loading: true });
    expect(resultTruthy).toBeTrue();
  });
});
