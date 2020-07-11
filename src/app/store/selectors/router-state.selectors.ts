import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { routerFeatureKey } from 'src/app/utils/customSerializer';

export const selectRouterState = createFeatureSelector<RouterState>(routerFeatureKey);

// export const selectRouter = createSelector(selectRouterState, state => state.root.params);

// export const selectRouterId = createSelector(selectRouterState, state => state.snapshot.params.id);
