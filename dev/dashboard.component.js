System.register(['angular2/core', 'angular2/router', "./app.component", "ng2-bootstrap/ng2-bootstrap", "./question-feed.component", "./question-form.component", "./class-input.component", "./services/http-service", "./models/question"], function(exports_1) {
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
    var core_1, router_1, app_component_1, ng2_bootstrap_1, question_feed_component_1, question_form_component_1, class_input_component_1, http_service_1, question_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (question_feed_component_1_1) {
                question_feed_component_1 = question_feed_component_1_1;
            },
            function (question_form_component_1_1) {
                question_form_component_1 = question_form_component_1_1;
            },
            function (class_input_component_1_1) {
                class_input_component_1 = class_input_component_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                /**
                 * For the constructor must inject the parent "loginComponent" as
                 * need to change parent variables which control button states (e.g.
                 * the login/logout button in this case)
                 * @param _parent
                 */
                function DashboardComponent(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.emptyFeed = true;
                    this.classes = [];
                    this.isCollapsedQuestion = true;
                    this.isCollapsedClass = true;
                    console.log("Set user as logged in (button state)");
                    _parent.setLoggedIn();
                }
                /**
                 * This is called in child component instead of onInit because
                 * it's called when this component is routed to while onInit isn't
                 * (onInit may only be activated when the component is created? not
                 * sure must come back to this.. there were issues on the angular2 forum)
                 * @param next
                 * @param prev
                 */
                DashboardComponent.prototype.ngOnInit = function () {
                    console.log("Navigated to dashboard");
                    this.id_token = localStorage.getItem('id_token');
                    // populate the class dropdown box and load the question feed
                    this.getClassList();
                    // get all user questions
                    this.userQuestionIds = JSON.parse(localStorage.getItem('user')).questions;
                };
                DashboardComponent.prototype.classChange = function (value) {
                    console.log("changed");
                    this.selectedClass = value;
                    this.getQuestions();
                };
                DashboardComponent.prototype.getClassList = function () {
                    var _this = this;
                    var classListArray = [];
                    this.httpService.getAllClasses().subscribe(function (data) { return classListArray = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return _this.populateClassDropdown(classListArray); });
                };
                DashboardComponent.prototype.populateClassDropdown = function (classListArray) {
                    this.classes = [];
                    for (var _i = 0; _i < classListArray.length; _i++) {
                        var item = classListArray[_i];
                        this.classes.push(JSON.parse(JSON.stringify(item)).name);
                    }
                    this.selectedClass = this.classes[0];
                    this.getQuestions();
                };
                DashboardComponent.prototype.getQuestions = function () {
                    var _this = this;
                    var questionListArray = [];
                    this.httpService.getQuestion(this.selectedClass).subscribe(function (data) { return questionListArray = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return _this.populateFeed(questionListArray); });
                };
                DashboardComponent.prototype.populateFeed = function (questionArray) {
                    this.questions = [];
                    for (var _i = 0; _i < questionArray.length; _i++) {
                        var item = questionArray[_i];
                        console.log((JSON.parse(JSON.stringify(item)).classid));
                        var question = new question_1.Question((JSON.parse(JSON.stringify(item)).classid), (JSON.parse(JSON.stringify(item)).question), (JSON.parse(JSON.stringify(item)).summary), (JSON.parse(JSON.stringify(item)).choices), (JSON.parse(JSON.stringify(item)).answers), (JSON.parse(JSON.stringify(item)).userid), (JSON.parse(JSON.stringify(item)).date), (JSON.parse(JSON.stringify(item)).type), (JSON.parse(JSON.stringify(item)).anonymous));
                        this.questions.push(question);
                    }
                    if (this.questions.length > 0) {
                        this.emptyFeed = false;
                    }
                    else {
                        this.emptyFeed = true;
                    }
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard',
                        providers: [http_service_1.HTTPService]
                    }),
                    core_1.View({
                        templateUrl: 'views/dashboard.html',
                        directives: [router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.Alert, question_feed_component_1.QuestionFeedComponent,
                            class_input_component_1.ClassInputComponent, question_form_component_1.QuestionInputFormComponent, ng2_bootstrap_1.Collapse]
                    }),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, http_service_1.HTTPService])
                ], DashboardComponent);
                return DashboardComponent;
            })();
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
