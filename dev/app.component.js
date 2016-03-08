/**
 * Important! - when using ng2-bootstrap library, this reference path
 * tag must be added to the top of the component implementing the feature
 * in order for the typescript to compile. (Gulp will throw an error otherwise).
 */
System.register(["./dashboard.component", 'angular2/core', 'angular2/router', 'angular2/http', "./landing.component", "./about.component", 'angular2-jwt', 'ng2-bootstrap/ng2-bootstrap', "./services/http-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var dashboard_component_1, core_1, router_1, http_1, landing_component_1, about_component_1, angular2_jwt_1, ng2_bootstrap_1, http_service_1;
    var AppComponent;
    return {
        setters:[
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (landing_component_1_1) {
                landing_component_1 = landing_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router, http, authHttp, httpService) {
                    this._router = _router;
                    this.http = http;
                    this.authHttp = authHttp;
                    this.httpService = httpService;
                    /**
                     * Using the Lock interface with these options means it's embeddable in the page. The
                     * other option is the show() the Lock interface as a pop-up.
                     * ToDo: (Low priority) Decide which is better, the pop-up or the embedded version.
                     * The token response is the JWT necessary for user authentication throughout the application
                     * when navigating to routes with the @canActivate restriction and also necessary for Auth0
                     * api requests.
                     * @type {{container: string, responseType: string}}
                     */
                    this.options = {
                        //container: 'root',
                        responseType: 'token'
                    };
                    /**
                     * The lock instantiation requires the client id and domain respectively.
                     * ToDo: These hardcoded authentication values need to be removed from GitHub!
                     */
                    this.lock = new Auth0Lock('deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5', 'qanda.eu.auth0.com');
                    this.hash = this.lock.parseHash();
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
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
                        this._router.navigateByUrl('/dash');
                    }
                };
                /**
                 * Function fired when the login button is pressed.
                 *
                 * Setting up the Lock UI
                 * The lock.show() function sends the user's log-in details to the
                 * Auth0 service securely (using OAuth2/ OpenID connect)
                 * The response of the post request is a JWT and user profile details.
                 * These are stored in localStorage for later use.
                 * User then redirected to the dashboardComponent (child component of
                 * app.component)
                 */
                AppComponent.prototype.login = function () {
                    var _this = this;
                    console.log("Initializing the Auth0 form.");
                    //this._parent.userLoggedIn = true;
                    this.lock.show(this.options, function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                        console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token));
                        var userId = JSON.parse(localStorage.getItem('profile')).user_id;
                        // Get user details (joined classes, questions asked) from database
                        _this.httpService.getUserDetails(userId).subscribe(function (data) { return localStorage.setItem('user', JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return console.log("get user details success"); });
                        _this.userLoggedIn = true;
                        console.log("Login successful, redirecting to the dashboard.");
                        _this._router.navigate(['Dashboard']);
                    });
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
                 * Utility function to change the state of the userLoggedIn
                 * boolean which controls the state of the Login/Logout buttons
                 * on the nav bar. This
                 */
                AppComponent.prototype.setLoggedOut = function () {
                    this.userLoggedIn = false;
                };
                /**
                 * Utility function to change the state of the userLoggedIn
                 * boolean which controls the state of the Login/Logout buttons
                 * on the nav bar. This
                 */
                AppComponent.prototype.setLoggedIn = function () {
                    this.userLoggedIn = true;
                    this.userProfile = JSON.parse(localStorage.getItem('profile')).picture;
                };
                /**
                 * Non-Authenticated api request example
                 */
                AppComponent.prototype.getThing = function () {
                    this.http.get('/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                /**
                 * Authenticated api request example:
                 * ToDo: Save the user's id in the database - api request to express route
                 */
                AppComponent.prototype.getSecretThing = function () {
                    this.authHttp.get('/secured/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                /**
                 * Not sure what this does yet.. will come back to it!
                 */
                AppComponent.prototype.tokenSubscription = function () {
                    this.authHttp.tokenStream.subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                /**
                 * Helper method for getting the JWT from storage and getting
                 * various details from it such as the expiration etc.
                 * Can call for a refresh of the token if going to be expired and
                 * user is still logged in - ToDo: Refresh token
                 */
                AppComponent.prototype.useJwtHelper = function () {
                    var token = localStorage.getItem('id_token');
                    console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        providers: [http_service_1.HTTPService]
                    }),
                    core_1.View({
                        directives: [router_1.ROUTER_DIRECTIVES, dashboard_component_1.DashboardComponent, ng2_bootstrap_1.Alert],
                        templateUrl: 'views/app.html'
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Landing', component: landing_component_1.LandingComponent, useAsDefault: true },
                        { path: '/about', name: 'About', component: about_component_1.AboutComponent },
                        { path: '/dash', name: 'Dashboard', component: dashboard_component_1.DashboardComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, http_service_1.HTTPService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
