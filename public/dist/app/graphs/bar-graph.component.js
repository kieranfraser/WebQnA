System.register(['angular2/core', 'angular2/common', 'ng2-charts', "../answer-component", "../services/http-service"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_charts_1, answer_component_1, core_2, core_3, http_service_1;
    var BarGraphComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_charts_1_1) {
                ng2_charts_1 = ng2_charts_1_1;
            },
            function (answer_component_1_1) {
                answer_component_1 = answer_component_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            let BarGraphComponent = class BarGraphComponent {
                constructor(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.socket = null;
                    this.barChartOptions = {
                        scaleShowVerticalLines: false,
                        responsive: true,
                        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
                    };
                    this.barChartLabels = [];
                    this.barChartSeries = ['Selected'];
                    this.barChartType = 'Bar';
                    this.barChartLegend = false;
                    this.barChartData = [];
                    this.selectedQuestion = _parent.question;
                    this.barChartLabels = [];
                    this.getChoiceData();
                    this.socket = io('/');
                    this.socket.on('answer', function () {
                        console.log('Message from server: graph to be updated!!');
                        this.getChoiceData();
                    }.bind(this));
                }
                ngOnInit() {
                    this.barChartLabels = this.selectedQuestion.choices;
                    this.getChoiceData();
                }
                ngOnChanges() {
                    this.barChartLabels = this.selectedQuestion.choices;
                    this.getChoiceData();
                }
                // events
                chartClicked(e) {
                    console.log(e);
                }
                chartHovered(e) {
                    console.log(e);
                }
                getChoiceData() {
                    var choiceOne = 0;
                    var choiceTwo = 0;
                    var choiceThree = 0;
                    var choiceFour = 0;
                    var answers = this.selectedQuestion.answers;
                    for (var answer of answers) {
                        if (answer.answer === this.selectedQuestion.choices[0]) {
                            choiceOne = choiceOne + 1;
                        }
                        if (answer.answer === this.selectedQuestion.choices[1]) {
                            choiceTwo = choiceTwo + 1;
                        }
                        if (answer.answer === this.selectedQuestion.choices[2]) {
                            choiceThree = choiceThree + 1;
                        }
                        if (answer.answer === this.selectedQuestion.choices[3]) {
                            choiceFour = choiceFour + 1;
                        }
                    }
                    var choiceData = [choiceOne, choiceTwo, choiceThree, choiceFour];
                    this.barChartData = [choiceData];
                }
            };
            BarGraphComponent = __decorate([
                core_1.Component({
                    selector: 'bar-graph',
                    templateUrl: '../views/graphs/bar_graph.html',
                    inputs: ['selectedQuestion'],
                    directives: [ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                }),
                __param(0, core_3.Inject(core_2.forwardRef(() => answer_component_1.AnswerQuestionComponent))), 
                __metadata('design:paramtypes', [answer_component_1.AnswerQuestionComponent, http_service_1.HTTPService])
            ], BarGraphComponent);
            exports_1("BarGraphComponent", BarGraphComponent);
        }
    }
});

//# sourceMappingURL=../maps/graphs/bar-graph.component.js.map
