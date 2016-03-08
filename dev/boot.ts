import {bootstrap} from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {AppComponent} from "./app.component";
import {PathLocationStrategy, LocationStrategy} from 'angular2/router';

/**
 * Loads the root component (AppComponent).
 * Sets the base url as '/'
 * and the directives used?
 */

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(AuthHttp, { 
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
  }),
  provide(APP_BASE_HREF, {useValue:'/'}),
  provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
