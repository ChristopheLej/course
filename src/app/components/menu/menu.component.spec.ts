import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import * as fromAuth from '@store/selectors/auth.selector';

import { MenuComponent } from './menu.component';
import { Logout } from '@store/actions/user.actions';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let store: MockStore;
  let mockisLoggedInSelector: MemoizedSelector<ApplicationState, boolean>;
  let mockisLoggedOutSelector: MemoizedSelector<ApplicationState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [MaterialModule],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    store = TestBed.inject(MockStore);
    mockisLoggedInSelector = store.overrideSelector(fromAuth.isLoggedIn, false);
    mockisLoggedOutSelector = store.overrideSelector(fromAuth.isLoggedOut, true);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    component.isLoggedIn$.subscribe(result => expect(result).toBeFalse());
    component.isLoggedOut$.subscribe(result => expect(result).toBeTrue());
  });

  it('shoud change loggin/logout', () => {
    mockisLoggedInSelector.setResult(true);
    mockisLoggedOutSelector.setResult(false);
    store.refreshState();
    fixture.detectChanges();

    component.isLoggedIn$.subscribe(result => expect(result).toBeTrue());
    component.isLoggedOut$.subscribe(result => expect(result).toBeFalse());
  });

  it('should dispatch logout', () => {
    const expectedAction = new Logout();
    spyOn(store, 'dispatch').and.callThrough();
    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
