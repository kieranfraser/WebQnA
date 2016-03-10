/**
 * Created by kfraser on 29/02/2016.
 */
import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {AnswerQuestionComponent} from "../answer-component";
import {forwardRef} from "angular2/core";
import {Inject} from "angular2/core";
import {HTTPService} from "../services/http-service";
import {Question} from "../models/question";
import {Answer} from "../models/answer";
import {OnInit} from "angular2/core";


declare var io: any;

@Component({
    selector: 'bar-graph',
    templateUrl: '../views/graphs/bar_graph.html',
    inputs: ['selectedQuestion'],
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 */
export class BarGraphComponent implements OnInit{


    socket = null;
    selectedQuestion: Question;
    constructor(@Inject(forwardRef(() => AnswerQuestionComponent))private _parent: AnswerQuestionComponent,
                private httpService: HTTPService) {
        this.selectedQuestion = _parent.question;
        this.barChartLabels = [];
        this.getChoiceData();
        this.socket = io('/');
        this.socket.on('answer', function(){
            console.log('Message from server: graph to be updated!!');
            this.getChoiceData();
        }.bind(this));
    }

    ngOnInit(){
        this.barChartLabels = this.selectedQuestion.choices;
    }
    // events
    chartClicked(e:any) {
        console.log(e);
    }

    chartHovered(e:any) {
        console.log(e);
    }

    private barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
    };
    private barChartLabels = [];
    private barChartSeries = ['Selected'];
    public barChartType = 'Bar';
    private barChartLegend:boolean = false;

    private barChartData = [];

    getChoiceData(){
        var choiceOne = 0;
        var choiceTwo = 0;
        var choiceThree = 0;
        var choiceFour = 0;

        var answers: Answer[] = this.selectedQuestion.answers;

        for(var answer of answers){
            if(answer.answer === this.selectedQuestion.choices[0]){
                choiceOne = choiceOne + 1;
            }
            if(answer.answer === this.selectedQuestion.choices[1]){
                choiceTwo = choiceTwo + 1;
            }
            if(answer.answer === this.selectedQuestion.choices[2]){
                choiceThree = choiceThree + 1;
            }
            if(answer.answer === this.selectedQuestion.choices[3]){
                choiceFour = choiceFour + 1;
            }
        }
        var choiceData = [choiceOne, choiceTwo, choiceThree, choiceFour];
        this.barChartData = [choiceData];
    }
}