System.register(['angular2/core', 'angular2/common', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_bootstrap_1;
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
            }],
        execute: function() {
            ClassListComponent = (function () {
                function ClassListComponent() {
                    this.singleModel = '1';
                    this.radioModel = 'Middle';
                }
                ClassListComponent.prototype.save = function () {
                    for (var _i = 0, _a = this.classes; _i < _a.length; _i++) {
                        var a = _a[_i];
                        console.log(a);
                    }
                };
                ClassListComponent = __decorate([
                    core_1.Component({
                        selector: 'class-list',
                        templateUrl: 'views/dashboard/class_list_modal.html',
                        directives: [ng2_bootstrap_1.BUTTON_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        inputs: ['classes'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ClassListComponent);
                return ClassListComponent;
            }());
            exports_1("ClassListComponent", ClassListComponent);
        }
    }
});

//# sourceMappingURL=../maps/dashboard/class-list.js.map
