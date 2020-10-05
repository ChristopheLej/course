import { InjectionToken } from '@angular/core';
import { MetaReducer, StoreConfig } from '@ngrx/store';
import { LocalStorageService } from '@services';
import { storageMetaReducer } from '@store/reducers/storage.metareducer';
import * as fromReducer from '../reducers/lesson.reducer';
import * as fromAction from '../actions/lesson.actions';

export const LESSONS_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<fromReducer.LessonState, fromAction.LessonActions>
>('LessonsConfigToken');

export function getLessonsConfig(storageService: LocalStorageService) {
  return {
    metaReducers: [storageMetaReducer(['ids', 'entities'], '__lessons_storage__', storageService)]
  };
}
