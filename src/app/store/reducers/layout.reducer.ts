import * as fromActions from '../actions/layout.actions';
import { Theme } from '@models';

export interface State {
  theme: Theme;
}

const initialState: State = {
  theme: { class: 'pink-theme', name: 'pink theme' }
};

export function reducer(state = initialState, action: fromActions.LayoutActions): State {
  switch (action.type) {
    case fromActions.LayoutActionTypes.SetTheme:
      return { ...state, theme: action.payload };

    default:
      return state;
  }
}
