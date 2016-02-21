System.register(["./dashboard.component", 'angular2/core', 'angular2/router', 'angular2/http', 'angular2-jwt', "./login.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var dashboard_component_1, core_1, router_1, http_1, angular2_jwt_1, login_component_1;
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
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router, http, authHttp) {
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
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //this.lock.show(this.options);
                    if (!this.loggedIn()) {
                        this.lock.show(this.options, function (err, profile, id_token) {
                            if (err) {
                                throw new Error(err);
                            }
                            localStorage.setItem('profile', JSON.stringify(profile));
                            localStorage.setItem('id_token', id_token);
                            console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token));
                            console.log(JSON.stringify(profile));
                            _this._router.navigate(['Dashboard', { token: id_token }]);
                            /*this.authHttp.get('/dash').subscribe(
                                data => this.thing = data,
                                err => console.log(err),
                                () => console.log('Request Complete')
                            );*/
                        });
                    }
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
                AppComponent.prototype.login = function () {
                    var _this = this;
                    this.lock.show(this.options, function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                        console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token));
                        console.log(JSON.stringify(profile));
                    });
                };
                AppComponent.prototype.logout = function () {
                    var _this = this;
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this._router.navigate(['Login']);
                    this.lock.show(this.options, function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                        console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token));
                        console.log(JSON.stringify(profile));
                        _this._router.navigate(['Dashboard', { token: id_token }]);
                        /*this.authHttp.get('/dash').subscribe(
                         data => this.thing = data,
                         err => console.log(err),
                         () => console.log('Request Complete')
                         );*/
                    });
                };
                AppComponent.prototype.loggedIn = function () {
                    var token = localStorage.getItem('id_token');
                    if (token != null) {
                        if (this.jwtHelper.isTokenExpired(token)) {
                            console.log("false");
                            return false;
                        }
                        else {
                            console.log("true");
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                };
                AppComponent.prototype.getThing = function () {
                    this.http.get('http://localhost:3001/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                AppComponent.prototype.getSecretThing = function () {
                    this.authHttp.get('http://localhost:3001/secured/ping')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                AppComponent.prototype.tokenSubscription = function () {
                    this.authHttp.tokenStream.subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                AppComponent.prototype.useJwtHelper = function () {
                    var token = localStorage.getItem('id_token');
                    console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [router_1.ROUTER_DIRECTIVES, dashboard_component_1.DashboardComponent],
                        template: "\n    <h1>Qanda</h1>\n    <div id=\"root\" style=\"width: 280px; margin: 40px auto; padding: 10px; border-width: 1px;\">\n        embeded area\n    </div>\n    <div class=\"main\">\n        <button *ngIf=\"loggedIn()\" (click)=\"logout()\">Logout</button>\n        <router-outlet></router-outlet>\n    </div>\n  "
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/dash/:token', name: 'Dashboard', component: dashboard_component_1.DashboardComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
