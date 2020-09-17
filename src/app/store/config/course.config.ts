import { LocalStorageService } from '@services';
import { storageMetaReducer } from '@store/reducers/storage.metareducer';
import * as fromReducer from '@store/reducers/course.reducer';
import * as fromAction from '@store/actions/course.actions';
import { StoreConfig } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

// export function getCoursesConfig(
//   saveKeys: string[],
//   localStorageKey: string,
//   storageService: LocalStorageService
// ) {
//   return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
// }

export const COURSES_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<fromReducer.CourseState, fromAction.CourseActions>
>('CoursesConfigToken');

export function getCoursesConfig(storageService: LocalStorageService) {
  return {
    metaReducers: [storageMetaReducer(['ids', 'entities'], '__courses_storage__', storageService)]
  };
}

// export const COURSES_STORAGE_KEYS = new InjectionToken<keyof fromReducer.CourseState[]>(
//   'CoursesStorageKeys'
// );
// export const COURSES_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('CoursesStorage');
