import { Action } from '@ngrx/store';
import { Theme } from '@models';

export enum LayoutActionTypes {
  SetTheme = '[App] Set Theme'
}

export class SetActiveTheme implements Action {
  readonly type = LayoutActionTypes.SetTheme;

  constructor(public payload: Theme) {}
}

export type LayoutActions = SetActiveTheme;
