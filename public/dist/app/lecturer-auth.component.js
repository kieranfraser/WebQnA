System.register(['angular2/core', "./services/http-service", "./dashboard.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, http_service_1, dashboard_component_1;
    var LecturerAuthComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            }],
        execute: function() {
            let LecturerAuthComponent = class LecturerAuthComponent {
                constructor(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.unsent = true;
                }
                /**
                 * ToDo: don't allow lecturers send again or don't let them open this modal.
                 */
                ngOnInit() {
                    this.unsent = true;
                }
                getAuthorised() {
                    console.log("Authorise user");
                    console.log(JSON.parse(localStorage.getItem('profile')));
                    var json = JSON.stringify(JSON.parse(localStorage.getItem('profile')));
                    this.httpService.sendAuthEmail(json).subscribe(data => console.log(JSON.stringify(data)), error => alert(error), () => console.log("Email Sent!"));
                    this.unsent = false;
                }
            };
            LecturerAuthComponent = __decorate([
                core_1.Component({
                    selector: 'lecturer-auth',
                    templateUrl: 'views/lecturer_auth_modal.html',
                }),
                __param(0, core_1.Inject(core_1.forwardRef(() => dashboard_component_1.DashboardComponent))), 
                __metadata('design:paramtypes', [dashboard_component_1.DashboardComponent, http_service_1.HTTPService])
            ], LecturerAuthComponent);
            exports_1("LecturerAuthComponent", LecturerAuthComponent);
        }
    }
});

//# sourceMappingURL=maps/lecturer-auth.component.js.map
