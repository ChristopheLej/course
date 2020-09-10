import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';
import { Logout, Login } from '@store/actions/user.actions';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch Login', () => {
    const userTest = { email: 'test@EmailValidator.fr', password: 'MyPassWord' };
    const fb: FormBuilder = new FormBuilder();
    component.form = fb.group(userTest);

    const expectedAction = new Login(userTest);
    spyOn(store, 'dispatch').and.callThrough();

    component.login();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
