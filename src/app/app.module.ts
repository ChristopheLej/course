import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  ToolbarComponent,
  MenuComponent,
  LoginComponent,
  LayoutComponent,
  AboutComponent,
  HomeComponent
} from '@components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule, META_REDUCERS } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/effects/user.effect';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoursesModule } from '@courses/courses.module';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer, routerFeatureKey } from './utils/customSerializer';
import { getMetaReducers } from '@store/reducers/storage.metareducer';
import { LocalStorageService, RequestCacheService } from '@services';
import { ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY } from './app.tokens';
import { CachingInterceptor } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    LoginComponent,
    LayoutComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoursesModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: routerFeatureKey })
  ],
  providers: [
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: ROOT_STORAGE_KEYS, useValue: ['layout.theme', 'user.user', 'user.loggedIn'] },
    { provide: ROOT_LOCAL_STORAGE_KEY, useValue: '__app_storage__' },
    {
      provide: META_REDUCERS,
      deps: [ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getMetaReducers,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
