System.register(["./dashboard.component", 'angular2/core', 'angular2/router', 'angular2/http', 'angular2-jwt', "./default-empty.component", "./app.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var dashboard_component_1, core_1, router_1, http_1, angular2_jwt_1, default_empty_component_1, app_component_1;
    var LoginComponent;
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
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (default_empty_component_1_1) {
                default_empty_component_1 = default_empty_component_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                /**
                 * The constructor for this class must contain the injected parent (in this case this is the
                 * app.component) as values from the parent need to be changed in future child components.
                 * @param _parent - AppComponent - which contains the nav bar
                 * @param _router - need to use the same router
                 * @param http - for calling api services
                 * @param authHttp - for securely calling api services
                 */
                function LoginComponent(_parent, _router, http, authHttp) {
                    this._parent = _parent;
                    this._router = _router;
                    this.http = http;
                    this.authHttp = authHttp;
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
                        container: 'root',
                        responseType: 'token'
                    };
                    /**
                     * The lock instantiation requires the client id and domain respectively.
                     * ToDo: These hardcoded authentication values need to be removed from GitHub!
                     */
                    this.lock = new Auth0Lock('deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5', 'qanda.eu.auth0.com');
                    this.hash = this.lock.parseHash();
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    console.log(_parent.userLoggedIn);
                    _parent.changeUserLogInState();
                }
                /**
                 * Called on initialization - setting up the Lock UI
                 * The lock.show() function sends the user's log-in details to the
                 * Auth0 service securely (using OAuth2/ OpenID connect)
                 * The response of the post request is a JWT and user profile details.
                 * These are stored in localStorage for later use.
                 * User then redirected to the dashboardComponent (child component of
                 * this component)
                 */
                LoginComponent.prototype.ngOnInit = function () {
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
                        console.log(JSON.stringify(profile));
                        console.log("Login successful, redirecting to the dashboard.");
                        _this._router.navigate(['Dashboard']);
                    });
                };
                /**
                 * Non-Authenticated api request example
                 */
                LoginComponent.prototype.getThing = function () {
                    this.http.get('http://localhost:3001/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                /**
                 * Authenticated api request example:
                 * ToDo: Save the user's id in the database - api request to express route
                 */
                LoginComponent.prototype.getSecretThing = function () {
                    this.authHttp.get('http://localhost:3001/secured/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                /**
                 * Not sure what this does yet.. will come back to it!
                 */
                LoginComponent.prototype.tokenSubscription = function () {
                    this.authHttp.tokenStream.subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                /**
                 * Helper method for getting the JWT from storage and getting
                 * various details from it such as the expiration etc.
                 * Can call for a refresh of the token if going to be expired and
                 * user is still logged in - ToDo: Refresh token
                 */
                LoginComponent.prototype.useJwtHelper = function () {
                    var token = localStorage.getItem('id_token');
                    console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
                };
                /**
                 * Method used to change the state of the log-in/log-out buttons in the
                 * app.component. (Used by child components - propogates changes upwards)
                 */
                LoginComponent.prototype.changeUserLogInState = function () {
                    this._parent.changeUserLogInState();
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login'
                    }),
                    core_1.View({
                        templateUrl: 'views/login.html',
                        directives: [router_1.ROUTER_DIRECTIVES, dashboard_component_1.DashboardComponent]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Default', component: default_empty_component_1.DefaultEmptyComponent, useAsDefault: true },
                        { path: '/dash', name: 'Dashboard', component: dashboard_component_1.DashboardComponent }
                    ]),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
