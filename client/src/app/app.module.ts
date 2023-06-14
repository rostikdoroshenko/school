import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { ClassesModule } from './classes/classes.module';
import { metaReducers, reducers } from './store/reducers';
import { Effects } from './store/effects';
import { AuthEffects } from './auth/store/auth-effects';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    DashboardModule,
    RouterLink,
    ClassesModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([Effects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
