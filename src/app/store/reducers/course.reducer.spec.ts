import { Course } from '@models';
import { COURSES } from '@stubs/courses.stub';
import * as fromAction from '@store/actions/course.actions';
import * as fromClearAction from '@store/actions/clear.actions';

import * as fromReducer from './course.reducer';

describe('CourseReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialCourseState } = fromReducer;
      const action = {
        type: 'NOOP'
      };
      const state = fromReducer.reducer(initialCourseState, action);

      expect(state).toBe(initialCourseState);
    });
  });

  describe('retrieved Course load actions', () => {
    it('should retrieve none course and update the state for LoadCourses', () => {
      const { initialCourseState } = fromReducer;
      const action = fromAction.loadCourses();
      const state = fromReducer.reducer(initialCourseState, action);

      expect(state).toEqual({
        ...initialCourseState,
        loading: true,
        loaded: false
      });
    });

    it('should retrieve all courses and update the state in an immutable way', () => {
      const initialState = InitializeState();

      const entities = COURSES.reduce((a, x) => ({ ...a, [x.id]: x }), {});
      const ids = COURSES.reduce((a, x) => [...a, x.id], []);

      const newState = {
        loading: false,
        loaded: true,
        entities: entities,
        ids: ids
      };

      expect(initialState).toEqual(newState);
      expect(initialState).not.toBe(newState);
    });

    it('should retrieve none courses and update the state for ErrorLoadCourses', () => {
      const { initialCourseState } = fromReducer;
      const action = fromAction.errorLoadCourses({ payload: 'error load courses' });
      const state = fromReducer.reducer(initialCourseState, action);

      expect(state).toEqual({
        ...initialCourseState,
        loading: false,
        loaded: false
      });
    });

    it('should retrieve none courses and update the state for EmptyLoadCourses', () => {
      const initialState = InitializeState();

      const loadAction = fromAction.loadCourses();
      const loadState = fromReducer.reducer(initialState, loadAction);

      expect(loadState).not.toEqual(initialState);

      const emptyAction = fromAction.emptyLoadCourses();
      const emptyState = fromReducer.reducer(loadState, emptyAction);

      expect(emptyState).not.toEqual(loadState);
      expect(emptyState).toEqual(initialState);

      expect(emptyState).not.toBe(initialState);
    });
  });

  describe('retrieved Course load actions', () => {
    it('should retrieve none course and update the state for LoadCourse', () => {
      const initialState = InitializeState();

      const loadAction = fromAction.loadCourse({ courseId: 148 });
      const state = fromReducer.reducer(initialState, loadAction);

      expect(state).toEqual(initialState);
    });

    it('should retrieve all courses and update the state in an immutable way', () => {
      const initialState = InitializeState();

      const newCourse = {
        id: 123,
        description: 'description 123',
        iconUrl: 'iconUrl123',
        courseListIcon: 'courseListIcon123',
        longDescription: 'longDescription 123',
        category: 'category123',
        lessonsCount: 5,
        promo: false
      };
      const newCourses = [...COURSES, newCourse];

      const entities = newCourses.reduce((a, x) => ({ ...a, [x.id]: x }), {});
      const ids = newCourses.reduce((a, x) => [...a, x.id], []);

      const newUpdateState = {
        loading: false,
        loaded: true,
        entities: entities,
        ids: ids
      };

      const loadAction = fromAction.successLoadCourse({ course: newCourse });
      const state = fromReducer.reducer(initialState, loadAction);

      expect(state).not.toEqual(initialState);
      expect(state).toEqual(newUpdateState);
    });

    it('should retrieve all courses and update the state for ErrorLoadCourses', () => {
      const initialState = InitializeState();

      const errorAction = fromAction.errorLoadCourse({ payload: 'error load courses' });
      const state = fromReducer.reducer(initialState, errorAction);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('retrieved Course update actions', () => {
    it('should retrieve all courses for UpdateCourse and state does not change', () => {
      const index = 2;

      const initialState = InitializeState();

      const action = fromAction.updateCourse({
        id: COURSES[index].id,
        changes: { description: 'a new description' }
      });
      const updateState = fromReducer.reducer(initialState, action);

      expect(updateState).toEqual(initialState);
      expect(updateState).toBe(initialState);
    });

    it('should retrieve all courses and update the state in an immutable way', () => {
      const index = 1;
      const initialstate = InitializeState();

      const updateCourse = {
        ...COURSES[index],
        description: 'a new description'
      };
      const updateCourses = [...COURSES.slice(0, index), updateCourse, ...COURSES.slice(index + 1)];

      const entities = updateCourses.reduce((a, x) => ({ ...a, [x.id]: x }), {});
      const ids = updateCourses.reduce((a, x) => [...a, x.id], []);

      const newUpdateState = {
        loading: false,
        loaded: true,
        entities: entities,
        ids: ids
      };

      const updateAction = fromAction.successUpdateCourse({
        id: updateCourse.id,
        changes: { description: 'a new description' }
      });
      const updateState = fromReducer.reducer(initialstate, updateAction);

      expect(updateState).not.toEqual(initialstate);
      expect(updateState).toEqual(newUpdateState);
    });

    it('should retrieve all courses for ErrorUpdateCourse and state does not change', () => {
      const initialState = InitializeState();

      const action = fromAction.errorUpdateCourse({ payload: 'error update course' });
      const updateState = fromReducer.reducer(initialState, action);

      expect(updateState).toEqual(initialState);
      expect(updateState).toBe(initialState);
    });
  });

  describe('clear action', () => {
    it('should return an empty state', () => {
      const initialState = InitializeState();

      const action = fromClearAction.clearStore();
      const clearState = fromReducer.reducer(initialState, action);

      expect(clearState).not.toEqual(initialState);

      expect(clearState).toEqual(fromReducer.initialCourseState);
    });
  });

  function InitializeState(): fromReducer.CourseState {
    const { initialCourseState } = fromReducer;

    const loadAction = fromAction.successLoadCourses({ courses: COURSES });
    return fromReducer.reducer(initialCourseState, loadAction);
  }
});
