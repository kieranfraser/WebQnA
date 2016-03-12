System.register(['angular2/core', "./question-feed.component", "./models/question", "ng2-bootstrap/ng2-bootstrap", "./graphs/bar-graph.component", "./answer-form.component", "./services/http-service", "./graphs/doughnut-chart.component"], function(exports_1, context_1) {
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
    var core_1, question_feed_component_1, question_1, ng2_bootstrap_1, bar_graph_component_1, answer_form_component_1, http_service_1, doughnut_chart_component_1;
    var AnswerQuestionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_feed_component_1_1) {
                question_feed_component_1 = question_feed_component_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (bar_graph_component_1_1) {
                bar_graph_component_1 = bar_graph_component_1_1;
            },
            function (answer_form_component_1_1) {
                answer_form_component_1 = answer_form_component_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (doughnut_chart_component_1_1) {
                doughnut_chart_component_1 = doughnut_chart_component_1_1;
            }],
        execute: function() {
            AnswerQuestionComponent = (function () {
                /**
                 * 1. Get the question that was clicked.
                 * 2. Create wells for each answer in the question.answer array.
                 * 3. Create an input field for adding an answer.
                 * 4. On submit, add the the answer to the question.answer array and update the question.
                 */
                function AnswerQuestionComponent(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.socket = null;
                    this.isCollapsedAnswer = true;
                    this.isCollapsedStats = true;
                    this.question = new question_1.Question("", "", "", [], [], "", "", "", "", "", "");
                    this.socket = _parent.socket;
                    this.socket.on('answer', function () {
                        console.log('Message from server: answer feed to be updated!!');
                        this.getUpdatedSelectedQuestion();
                    }.bind(this));
                }
                AnswerQuestionComponent.prototype.updateQuestions = function () {
                    this._parent.updateQuestions();
                };
                AnswerQuestionComponent.prototype.getUpdatedSelectedQuestion = function () {
                    var _this = this;
                    var updatedQuestion;
                    var json = JSON.stringify(this.question);
                    this.httpService.getSelectedQuestion(json).subscribe(function (data) { return updatedQuestion = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return _this.setQuestion(updatedQuestion); });
                };
                /**
                 * ToDo: This could be cleaned up to be more efficient.
                 * @param updatedQuestion
                 */
                AnswerQuestionComponent.prototype.setQuestion = function (updatedQuestion) {
                    var questionArray = [];
                    for (var _i = 0, updatedQuestion_1 = updatedQuestion; _i < updatedQuestion_1.length; _i++) {
                        var item = updatedQuestion_1[_i];
                        console.log((JSON.parse(JSON.stringify(item)).classid));
                        var question = new question_1.Question((JSON.parse(JSON.stringify(item)).classid), (JSON.parse(JSON.stringify(item)).question), (JSON.parse(JSON.stringify(item)).summary), (JSON.parse(JSON.stringify(item)).choices), (JSON.parse(JSON.stringify(item)).answers), (JSON.parse(JSON.stringify(item)).userid), (JSON.parse(JSON.stringify(item)).date), (JSON.parse(JSON.stringify(item)).type), (JSON.parse(JSON.stringify(item)).anonymous), (JSON.parse(JSON.stringify(item)).username), (JSON.parse(JSON.stringify(item)).picture));
                        this.question = question;
                    }
                    //this.question.answers = answers;answers;
                    console.log(this.question);
                };
                AnswerQuestionComponent = __decorate([
                    core_1.Component({
                        selector: 'answer-question',
                        templateUrl: 'views/answer_question.html',
                        inputs: ['question'],
                        directives: [ng2_bootstrap_1.Collapse, bar_graph_component_1.BarGraphComponent, answer_form_component_1.AnswerInputFormComponent, doughnut_chart_component_1.DoughnutChartComponent],
                        providers: [http_service_1.HTTPService]
                    }),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return question_feed_component_1.QuestionFeedComponent; }))), 
                    __metadata('design:paramtypes', [question_feed_component_1.QuestionFeedComponent, http_service_1.HTTPService])
                ], AnswerQuestionComponent);
                return AnswerQuestionComponent;
            }());
            exports_1("AnswerQuestionComponent", AnswerQuestionComponent);
        }
    }
});

//# sourceMappingURL=maps/answer-component.js.map
