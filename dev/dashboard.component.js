System.register(['angular2/core', 'angular2/router', 'angular2-jwt', "angular2/router", "angular2/common", "./login.component"], function(exports_1) {
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
    var core_1, router_1, angular2_jwt_1, router_2, common_1, login_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                /**
                 * For the constructor must inject the parent "loginComponent" as
                 * need to change parent variables which control button states (e.g.
                 * the login/logout button in this case)
                 * @param _parent
                 */
                function DashboardComponent(_parent) {
                    this._parent = _parent;
                    console.log("changing the login button state");
                    _parent.changeUserLogInState();
                }
                /**
                 * This is called in child component instead of onInit because
                 * it's called when this component is routed to while onInit isn't
                 * (onInit may only be activated when the component is created? not
                 * sure must come back to this.. there were issues on the angular2 forum)
                 * @param next
                 * @param prev
                 */
                DashboardComponent.prototype.routerOnActivate = function (next, prev) {
                    console.log("Navigated to dashboard");
                    this.id_token = localStorage.getItem('id_token');
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard'
                    }),
                    core_1.View({
                        templateUrl: 'views/dashboard.html',
                        directives: [router_1.ROUTER_DIRECTIVES, DashboardComponent, common_1.CORE_DIRECTIVES]
                    }),
                    router_2.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return login_component_1.LoginComponent; }))), 
                    __metadata('design:paramtypes', [login_component_1.LoginComponent])
                ], DashboardComponent);
                return DashboardComponent;
            })();
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
