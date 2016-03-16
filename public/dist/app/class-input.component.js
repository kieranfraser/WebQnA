System.register(['angular2/core', "./models/lecture", "./services/http-service", "./class-list.component"], function(exports_1, context_1) {
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
    var core_1, lecture_1, http_service_1, class_list_component_1;
    var ClassInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lecture_1_1) {
                lecture_1 = lecture_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (class_list_component_1_1) {
                class_list_component_1 = class_list_component_1_1;
            }],
        execute: function() {
            let ClassInputComponent = class ClassInputComponent {
                /**
                 * Inject the dashboard to change the toggle button for viewing the
                 * class creation well (disappears on submission).
                 * @param _parent - Dashboard component
                 */
                constructor(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.className = "";
                }
                ngOnInit() { }
                /**
                 * Used to create a new class - TODO: change from profile to user when user is completed
                 * Creator of the class is added as a participant.
                 * @param value - input class name
                 */
                addClass() {
                    this.newClass = new lecture_1.Lecture(this.className, [JSON.parse(localStorage.getItem('profile')).user_id], []);
                    var json = JSON.stringify(this.newClass);
                    this.httpService.addClass(json).subscribe(data => console.log(JSON.stringify(data)), error => alert(error), () => console.log("Class added"));
                    console.log(JSON.stringify(this.newClass));
                    this.className = "";
                    this._parent.refresh();
                    this._parent.isCollapsedClass = !this._parent.isCollapsedClass;
                }
            };
            ClassInputComponent = __decorate([
                core_1.Component({
                    selector: 'class-input',
                    providers: [http_service_1.HTTPService]
                }),
                core_1.View({
                    templateUrl: 'views/class_input.html'
                }),
                __param(0, core_1.Inject(core_1.forwardRef(() => class_list_component_1.ClassListComponent))), 
                __metadata('design:paramtypes', [class_list_component_1.ClassListComponent, http_service_1.HTTPService])
            ], ClassInputComponent);
            exports_1("ClassInputComponent", ClassInputComponent);
        }
    }
});

//# sourceMappingURL=maps/class-input.component.js.map
