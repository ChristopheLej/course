import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services';
import { Router } from '@angular/router';
import { ApplicationState } from '@storeConfig';
import { Store } from '@ngrx/store';
import { Login } from '@store/actions/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<ApplicationState>,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  login() {
    const val = this.form.value;
    this.store.dispatch(new Login({ email: val.email, password: val.password }));
  }
}
