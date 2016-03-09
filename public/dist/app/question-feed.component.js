System.register(['angular2/core', 'angular2/common', "ng2-bootstrap/ng2-bootstrap", "./models/question", "./services/http-service", "./answer-component", "./dashboard.component"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_bootstrap_1, question_1, http_service_1, answer_component_1, dashboard_component_1;
    var QuestionFeedComponent;
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
            },
            function (question_1_1) {
                question_1 = question_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (answer_component_1_1) {
                answer_component_1 = answer_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            }],
        execute: function() {
            QuestionFeedComponent = (function () {
                function QuestionFeedComponent(httpService, _parent) {
                    this.httpService = httpService;
                    this._parent = _parent;
                }
                QuestionFeedComponent.prototype.ngOnInit = function () {
                    console.log("Feed Loaded");
                    this.selectedQuestion = new question_1.Question("", "", "", [], [], "", "", "", "");
                    // get the list of questions for the given class
                };
                QuestionFeedComponent.prototype.clickedQuestion = function (question) {
                    this.selectedQuestion = question;
                };
                QuestionFeedComponent.prototype.updateQuestions = function () {
                    this._parent.getQuestions();
                };
                QuestionFeedComponent = __decorate([
                    core_1.Component({
                        selector: 'question-feed',
                        providers: [http_service_1.HTTPService],
                        inputs: ['classValue', 'questions']
                    }),
                    core_1.View({
                        templateUrl: 'views/question_feed.html',
                        directives: [ng2_bootstrap_1.Alert, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES, answer_component_1.AnswerQuestionComponent]
                    }),
                    __param(1, core_1.Inject(core_1.forwardRef(function () { return dashboard_component_1.DashboardComponent; }))), 
                    __metadata('design:paramtypes', [http_service_1.HTTPService, dashboard_component_1.DashboardComponent])
                ], QuestionFeedComponent);
                return QuestionFeedComponent;
            }());
            exports_1("QuestionFeedComponent", QuestionFeedComponent);
        }
    }
});

//# sourceMappingURL=maps/question-feed.component.js.map
