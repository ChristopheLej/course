import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { MenuComponent } from '@components/menu/menu.component';
import { LoginComponent } from '@components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, META_REDUCERS } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/effects/user.effect';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoursesModule } from '@courses/courses.module';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer, routerFeatureKey } from './utils/customSerializer';
import { storageMetaReducer } from '@store/reducers/storage.metareducer';
import { LocalStorageService } from '@services';
import { ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY } from './app.tokens';

export function getMetaReducers(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  return [storageMetaReducer(saveKeys, localStorageKey, storageService)];
}

@NgModule({
  declarations: [AppComponent, ToolbarComponent, MenuComponent, LoginComponent],
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
    { provide: RouterStateSerializer, useClass: CustomSerializer }
    // { provide: ROOT_STORAGE_KEYS, useValue: ['courses'] },
    // { provide: ROOT_LOCAL_STORAGE_KEY, useValue: '__app_storage__' },
    // {
    //   provide: META_REDUCERS,
    //   deps: [ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY, LocalStorageService],
    //   useFactory: getMetaReducers
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
