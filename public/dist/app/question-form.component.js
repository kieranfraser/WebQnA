System.register(['angular2/core', 'angular2/http', "./models/question", "./services/http-service", "./dashboard.component", "./form-utilities/tag-input.component"], function(exports_1, context_1) {
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
    var core_1, http_1, question_1, http_service_1, dashboard_component_1, tag_input_component_1;
    var QuestionInputFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (tag_input_component_1_1) {
                tag_input_component_1 = tag_input_component_1_1;
            }],
        execute: function() {
            let QuestionInputFormComponent = class QuestionInputFormComponent {
                constructor(_parent, http, httpService) {
                    this._parent = _parent;
                    this.http = http;
                    this.httpService = httpService;
                    this.types = ["Free-text", "Multi-choice"];
                    this.today = new Date();
                    this.socket = null;
                    this.questionModel = new question_1.Question(this.selectedClass, "", "", [], [], JSON.parse(localStorage.getItem('profile')).user_id, this.today.toString(), this.types[0], "", JSON.parse(localStorage.getItem('profile')).name, JSON.parse(localStorage.getItem('profile')).picture, []);
                    this.choiceOne = "";
                    this.choiceTwo = "";
                    this.choiceThree = "";
                    this.choiceFour = "";
                    this.questionTags = [];
                    this.submitted = false;
                    this.selectedClass = this._parent.selectedClass;
                    this.socket = _parent.socket;
                    this.socket.on('update', function () {
                        console.log('Message from server: question feed to be updated');
                        this._parent.getQuestions();
                    }.bind(this));
                }
                onSubmit() {
                    this.submitted = true;
                    this.today = new Date();
                    console.log(this.questionModel);
                    console.log(this.selectedClass);
                    this.questionModel.classid = this.selectedClass;
                    this.questionModel.tags = this.questionTags;
                    // logic for choices
                    if (this.questionModel.type === 'Multi-choice') {
                        console.log("the choices are:");
                        console.log(this.questionModel.choices);
                        this.questionModel.choices = [this.choiceOne, this.choiceTwo, this.choiceThree, this.choiceFour];
                    }
                    var json = JSON.stringify(this.questionModel);
                    console.log(json);
                    this.httpService.addQuestion(json).subscribe(data => console.log(JSON.stringify(data)), error => alert(error), () => console.log("post question success"));
                    console.log(JSON.stringify(this.questionModel));
                    this.questionModel = new question_1.Question(this.selectedClass, "", "", [], [], JSON.parse(localStorage.getItem('profile')).user_id, this.today.toString(), this.types[0], "", JSON.parse(localStorage.getItem('profile')).name, JSON.parse(localStorage.getItem('profile')).picture, []);
                    this.socket.emit('update', 'question');
                    this._parent.isCollapsedQuestion = !this._parent.isCollapsedQuestion;
                    this._parent.getQuestions();
                }
            };
            QuestionInputFormComponent = __decorate([
                core_1.Component({
                    selector: 'question-input-form',
                    providers: [http_service_1.HTTPService],
                    inputs: ['selectedClass'],
                    templateUrl: 'views/question_input_form.html',
                    directives: [tag_input_component_1.TagInputComponent]
                }),
                __param(0, core_1.Inject(core_1.forwardRef(() => dashboard_component_1.DashboardComponent))), 
                __metadata('design:paramtypes', [dashboard_component_1.DashboardComponent, http_1.Http, http_service_1.HTTPService])
            ], QuestionInputFormComponent);
            exports_1("QuestionInputFormComponent", QuestionInputFormComponent);
        }
    }
});

//# sourceMappingURL=maps/question-form.component.js.map
