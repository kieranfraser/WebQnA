System.register(["./dashboard.component", 'angular2/common', 'angular2/core', 'angular2/router', 'angular2/http', 'angular2-jwt', "./default-empty.component", "./app.component"], function(exports_1) {
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
    var dashboard_component_1, common_1, core_1, router_1, http_1, angular2_jwt_1, default_empty_component_1, app_component_1;
    var LoginComponent;
    return {
        setters:[
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
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
                //constructor(private _router:Router,public http: Http, public authHttp: AuthHttp) {}
                function LoginComponent(_parent, _router, http, authHttp) {
                    this._parent = _parent;
                    this._router = _router;
                    this.http = http;
                    this.authHttp = authHttp;
                    this.options = {
                        container: 'root',
                        responseType: 'token'
                    };
                    this.lock = new Auth0Lock('deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5', 'qanda.eu.auth0.com');
                    this.hash = this.lock.parseHash();
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    console.log(_parent.userLoggedIn);
                    _parent.changeUserLogInState();
                }
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
                        /*this.authHttp.get('/dash').subscribe(
                         data => this.thing = data,
                         err => console.log(err),
                         () => console.log('Request Complete')
                         );*/
                    });
                };
                /*  Pop Up Log in
                 ngOnInit(){
                 //this.lock.show(this.options);
                 if (this.hash) {
                 if (this.hash.error) {
                 console.log("There was an error logging in", this.hash.error);
                 } else {
                 this.lock.getProfile(this.hash.id_token, function(err, profile) {
                 if (err) {
                 console.log('Cannot get user :(', err);
                 return;
                 }
                 console.log("Hey dude", profile);
                 });
                 }
                 }
                 this.lock.show(this.options);
                 }*/
                LoginComponent.prototype.getThing = function () {
                    this.http.get('http://localhost:3001/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                LoginComponent.prototype.getSecretThing = function () {
                    this.authHttp.get('http://localhost:3001/secured/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                LoginComponent.prototype.tokenSubscription = function () {
                    this.authHttp.tokenStream.subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                LoginComponent.prototype.useJwtHelper = function () {
                    var token = localStorage.getItem('id_token');
                    console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login'
                    }),
                    core_1.View({
                        templateUrl: 'views/login.html',
                        directives: [router_1.ROUTER_DIRECTIVES, dashboard_component_1.DashboardComponent, common_1.CORE_DIRECTIVES]
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
