System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'angular2/http', 'angular2-jwt', "./app.component"], function(exports_1) {
    var browser_1, core_1, router_1, http_1, angular2_jwt_1, app_component_1, router_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            /**
             * Loads the root component (AppComponent).
             * Sets the base url as '/'
             * and the directives used?
             */
            browser_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                core_1.provide(angular2_jwt_1.AuthHttp, {
                    useFactory: function (http) {
                        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig(), http);
                    },
                    deps: [http_1.Http]
                }),
                core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
                core_1.provide(router_2.LocationStrategy, { useClass: router_2.PathLocationStrategy })
            ]);
        }
    }
});
