import { Action, ActionReducer, INIT } from '@ngrx/store';
import { merge, pick } from 'lodash-es';
import { LocalStorageService } from '@services';

export function storageMetaReducer<S, A extends Action = Action>(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  let onInit = true;

  return (reducer: ActionReducer<S, A>) => {
    return (state: S, action: A): S => {
      console.log('storageMetaReducer: ', action.type);
      const nextState = reducer(state, action);

      if (onInit) {
        onInit = false;
        const savedState = storageService.getSavedState(localStorageKey);
        // const s1 = { ...nextState, ...savedState };
        const s2 = merge(nextState, savedState);
        console.log('storageMetaReducer init', s2);
        return merge(nextState, savedState);
      }

      const stateToSave = pick(nextState, saveKeys);
      console.log('storageMetaReducer', nextState);
      storageService.setSavedState(stateToSave, localStorageKey);
      return nextState;
    };
  };
}
