import { createAction } from '@ngrx/store';

export enum ActionTypes {
  ClearStore = '[STORE] Clear store'
}

export const clearStore = createAction(ActionTypes.ClearStore);
