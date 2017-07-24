import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {APP_ROUTING} from './app.routing';
import {MdButtonModule, MdInputModule, MdTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk';
import {ApiService} from "./api.service";
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthGuard} from "./auth.guard";
import {environment} from "../environments/environment";
import {APP_CONFIG_TOKEN} from "./infra/di-tokens";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => {
      let  key = localStorage.getItem('token');
      return key;

    }),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

const appConfigProvider = {provide: APP_CONFIG_TOKEN, useValue: environment};

const authProvider = {
  provide: AuthHttp,
  useFactory: authHttpServiceFactory,
  deps: [Http, RequestOptions]
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    CdkTableModule,
    MdTableModule,
    APP_ROUTING
  ],
  providers: [
    appConfigProvider
    , authProvider
    ,  AuthGuard
    , ApiService
  ]
  ,bootstrap: [AppComponent]
})
export class AppModule { }
