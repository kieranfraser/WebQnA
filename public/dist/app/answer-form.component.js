System.register(['angular2/core', "./answer-component", "./models/answer", "./services/http-service", 'angular2/common', "ng2-bootstrap/ng2-bootstrap"], function(exports_1, context_1) {
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
    var core_1, answer_component_1, answer_1, http_service_1, common_1, ng2_bootstrap_1;
    var AnswerInputFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (answer_component_1_1) {
                answer_component_1 = answer_component_1_1;
            },
            function (answer_1_1) {
                answer_1 = answer_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            AnswerInputFormComponent = (function () {
                function AnswerInputFormComponent(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.socket = null;
                    this.answerModel = new answer_1.Answer("", "", "", "", JSON.parse(localStorage.getItem('profile')).name, JSON.parse(localStorage.getItem('profile')).picture);
                    this.now = new Date();
                    this.submitted = false;
                    this.selectedQuestion = _parent.question;
                    //this.socket = io('/');
                }
                AnswerInputFormComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.submitted = true;
                    this.now = new Date();
                    this.answerModel.user = JSON.parse(localStorage.getItem('profile')).user_id;
                    this.answerModel.date = this.now.toString();
                    this.selectedQuestion.answers.push(this.answerModel);
                    console.log('this is the question');
                    console.log(this.selectedQuestion);
                    if (this.answerModel.answer != "") {
                        var json = JSON.stringify(this.selectedQuestion);
                        this.httpService.updateQuestion(json).subscribe(function (data) { return console.log(JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return _this.sendUpdate(); });
                        this.answerModel = new answer_1.Answer("", "", "", "", JSON.parse(localStorage.getItem('profile')).name, JSON.parse(localStorage.getItem('profile')).picture);
                        this._parent.isCollapsedAnswer = true;
                    }
                };
                AnswerInputFormComponent.prototype.sendUpdate = function () {
                    console.log("post answer success");
                    this.socket.emit('update', 'answer');
                };
                AnswerInputFormComponent = __decorate([
                    core_1.Component({
                        selector: 'answer-input-form',
                        templateUrl: 'views/answer_input_form.html',
                        inputs: ['selectedQuestion'],
                        providers: [http_service_1.HTTPService],
                        directives: [ng2_bootstrap_1.BUTTON_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                    }),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return answer_component_1.AnswerQuestionComponent; }))), 
                    __metadata('design:paramtypes', [answer_component_1.AnswerQuestionComponent, http_service_1.HTTPService])
                ], AnswerInputFormComponent);
                return AnswerInputFormComponent;
            }());
            exports_1("AnswerInputFormComponent", AnswerInputFormComponent);
        }
    }
});

//# sourceMappingURL=maps/answer-form.component.js.map
