System.register(['angular2/core', 'angular2/common', 'ng2-bootstrap/ng2-bootstrap', "./models/user", "./services/http-service", "./dashboard.component", "./class-input.component"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_bootstrap_1, user_1, http_service_1, dashboard_component_1, class_input_component_1, ng2_bootstrap_2;
    var ClassListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
                ng2_bootstrap_2 = ng2_bootstrap_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (class_input_component_1_1) {
                class_input_component_1 = class_input_component_1_1;
            }],
        execute: function() {
            ClassListComponent = (function () {
                function ClassListComponent(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.singleModel = '1';
                    this.radioModel = 'Middle';
                    this.isCollapsedClass = true;
                }
                ClassListComponent.prototype.ngOnInit = function () {
                    this.auth = JSON.parse(localStorage.getItem('user')).auth;
                };
                ClassListComponent.prototype.save = function () {
                    var joinedList = [];
                    for (var _i = 0, _a = this.classes; _i < _a.length; _i++) {
                        var lecture = _a[_i];
                        if (lecture['joined'] === true) {
                            joinedList.push(lecture['class']);
                        }
                    }
                    this.user = new user_1.User(JSON.parse(localStorage.getItem('profile')).user_id, joinedList, [], [], "", "");
                    var json = JSON.stringify(this.user);
                    this.httpService.updateUserClasses(json).subscribe(function (data) { return console.log(JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return console.log("User classes updated"); });
                    this._parent.getClassList();
                    this._parent.selectedClass = '';
                };
                ClassListComponent.prototype.refresh = function () {
                    this._parent.getClassList();
                };
                ClassListComponent = __decorate([
                    core_1.Component({
                        selector: 'class-list',
                        templateUrl: 'views/class_list_modal.html',
                        directives: [ng2_bootstrap_1.BUTTON_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, class_input_component_1.ClassInputComponent, ng2_bootstrap_2.Collapse],
                        inputs: ['classes'],
                    }),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return dashboard_component_1.DashboardComponent; }))), 
                    __metadata('design:paramtypes', [dashboard_component_1.DashboardComponent, http_service_1.HTTPService])
                ], ClassListComponent);
                return ClassListComponent;
            }());
            exports_1("ClassListComponent", ClassListComponent);
        }
    }
});

//# sourceMappingURL=maps/class-list.component.js.map
