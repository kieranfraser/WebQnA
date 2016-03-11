/**
 * Created by kfraser on 10/03/2016.
 */
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
import {OnChanges} from "angular2/core";
import {AfterViewChecked} from "angular2/core";


declare var io: any;

@Component({
    selector: 'doughnut-chart',
    templateUrl: '../views/graphs/doughnut_chart.html',
    inputs: ['selectedQuestion'],
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 */
export class DoughnutChartComponent implements OnInit, OnChanges{

    selectedQuestion: Question;

    constructor() {
    }

    ngOnInit(){
    }

    ngOnChanges(){
    }

    // events
    chartClicked(e:any) {
        console.log(e);
    }

    chartHovered(e:any) {
        console.log(e);
    }

    // Doughnut
    private doughnutChartLabels = ['Participated', 'Yet to Participate'];
    private doughnutChartData = [7, 20];
    private doughnutChartType = 'Doughnut';

}