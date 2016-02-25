/**
 * Important! - when using ng2-bootstrap library, this reference path
 * tag must be added to the top of the component implementing the feature
 * in order for the typescript to compile. (Gulp will throw an error otherwise).
 */
System.register(['angular2/core', 'angular2/router', 'angular2/http', "./login.component", "./landing.component", 'angular2-jwt', "./about.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, login_component_1, landing_component_1, angular2_jwt_1, about_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (landing_component_1_1) {
                landing_component_1 = landing_component_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router, http) {
                    this._router = _router;
                    this.http = http;
                    /**
                     * The boolean which controls the login/logout button on the nav bar
                     * @type {boolean}
                     */
                    this.userLoggedIn = false;
                }
                /**
                 * On init must check if the user is logged in:
                 * ToDo: redirect to the dashboard if the user is already logged in.
                 *
                 */
                AppComponent.prototype.ngOnInit = function () {
                    console.log('Checking if the user is logged in on init.');
                    if (angular2_jwt_1.tokenNotExpired()) {
                        this.userLoggedIn = true;
                    }
                };
                /**
                 * Function fired when the login button is pressed.
                 * Redirects to the login route which contains the auth0
                 * api interface.
                 */
                AppComponent.prototype.login = function () {
                    this._router.navigate(['Login']);
                };
                /**
                 * Function fired when the logout button is pressed. Deletes the user's JWT
                 * and profile from local storage, sets the logged in boolean as false so the
                 * login button is redisplayed and redirects to the landing page of the site.
                 */
                AppComponent.prototype.logout = function () {
                    console.log('User has logged out. Redirect to landing page.');
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this.userLoggedIn = false;
                    this._router.navigate(['Landing']);
                };
                /**
                 * Checks whether or not the user is logged in.
                 * @returns {boolean}
                 */
                AppComponent.prototype.checkUserLoggedIn = function () {
                    if (this.userLoggedIn) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                /**
                 * Utility function to change the state of the userLoggedIn
                 * boolean which controls the state of the Login/Logout buttons
                 * on the nav bar. This function is used in child components.
                 */
                AppComponent.prototype.changeUserLogInState = function () {
                    if (this.userLoggedIn) {
                        this.userLoggedIn = false;
                    }
                    else {
                        this.userLoggedIn = true;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app'
                    }),
                    core_1.View({
                        directives: [router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent],
                        templateUrl: 'views/app.html'
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Landing', component: landing_component_1.LandingComponent, useAsDefault: true },
                        { path: '/login/...', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/about', name: 'About', component: about_component_1.AboutComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
