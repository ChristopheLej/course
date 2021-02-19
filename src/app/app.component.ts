import { Component, OnInit } from '@angular/core';
import { Theme } from '@models';
import { SetActiveTheme } from '@store/actions/layout.actions';
import { APP_THEMES } from './models/layout.model';
import * as fromReducer from '@store/reducers/layout.reducer';
import * as fromSelector from '@store/selectors/layout.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Courses';
  opened: boolean;
  appThemes = APP_THEMES;
  activeTheme$: Observable<Theme>;

  constructor(private store: Store<fromReducer.State>) {}

  ngOnInit(): void {
    this.activeTheme$ = this.store.select(fromSelector.getActiveTheme);
  }

  onToggle() {
    this.opened = !this.opened;
  }

  public themeSelected(theme: Theme) {
    this.store.dispatch(new SetActiveTheme(theme));
  }
}
