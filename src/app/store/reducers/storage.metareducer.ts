import { Action, ActionReducer, INIT, MetaReducer } from '@ngrx/store';
import { merge, pick } from 'lodash-es';
import { LocalStorageService } from '@services';
import { ApplicationState } from '@storeConfig';

export function storageMetaReducer<S, A extends Action = Action>(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  let onInit = true;

  return (reducer: ActionReducer<S, A>) => {
    return (state: S, action: A): S => {
      // console.log('storageMetaReducer - action: ', action.type);
      const nextState = reducer(state, action);
      // console.log('storageMetaReducer -previous state: ', state);
      // console.log('storageMetaReducer -next state: ', nextState);

      if (onInit) {
        onInit = false;
        const savedState = storageService.getSavedState(localStorageKey);
        // // const s1 = { ...nextState, ...savedState };
        // const s2 = merge(nextState, savedState);
        // console.log('storageMetaReducer - init savedState', savedState, localStorageKey);
        // console.log('storageMetaReducer - init mergeState', s2);
        return merge(nextState, savedState);
      }

      const stateToSave = pick(nextState, saveKeys);
      // console.log('storageMetaReducer - stateToSave', stateToSave);
      storageService.setSavedState(stateToSave, localStorageKey);
      return nextState;
    };
  };
}

export function getMetaReducers(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
): MetaReducer<ApplicationState> {
  return storageMetaReducer(saveKeys, localStorageKey, storageService);
}
