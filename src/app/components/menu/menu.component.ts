import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import { isLoggedIn, isLoggedOut } from '@store/selectors/auth.selector';
import { Logout } from '@store/actions/user.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() menuSelected = new EventEmitter();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  get isConnected(): boolean {
    return true;
  }

  logout() {
    this.store.dispatch(new Logout());
    this.clickMenu();
  }

  clickMenu() {
    this.menuSelected.emit();
  }
}
