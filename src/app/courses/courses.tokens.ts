import { InjectionToken } from '@angular/core';
import { StoreConfig } from '@ngrx/store/src/store_module';
import * as fromReducer from '@store/reducers/course.reducer';
import * as fromActions from '@store/actions/course.actions';

export const COURSES_STORAGE_KEYS = new InjectionToken<keyof fromReducer.CourseState[]>('CoursesStorageKeys');
export const COURSES_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('CoursesStorage');
export const COURSES_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.CourseState, fromActions.CourseActions>>(
  'CoursesConfigToken'
);
