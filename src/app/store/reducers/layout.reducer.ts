import * as fromActions from '../actions/layout.actions';
import { Theme } from '@models';
import { ActionTypes, clearStore } from '@store/actions/clear.actions';

export interface State {
  theme: Theme;
}

const initialState: State = {
  theme: { class: 'pink-theme', name: 'pink theme' }
};

export function reducer(
  state = initialState,
  action: fromActions.LayoutActions | typeof clearStore
): State {
  switch (action.type) {
    case fromActions.LayoutActionTypes.SetTheme:
      return { ...state, theme: action.payload };

    case ActionTypes.ClearStore:
      return initialState;

    default:
      return state;
  }
}
