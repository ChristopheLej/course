import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer, RouterReducerState } from '@ngrx/router-store';

export const routerFeatureKey = 'router';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}
export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
