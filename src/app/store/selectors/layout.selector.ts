import { Theme } from '@models';
import { createSelector } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';

export const layout = (state): fromLayout.State => state.layout;

export const getActiveTheme = createSelector(layout, (state): Theme => state.theme);
