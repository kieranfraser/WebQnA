/**
 * Created by kfraser on 29/02/2016.
 */
import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {CHART_DIRECTIVES} from 'ng2-charts';

@Component({
    selector: 'bar-graph',
    templateUrl: '../views/graphs/bar_graph.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 */
export class BarGraphComponent{

    constructor() {
        console.log('pie demo');
    }

    // events
    chartClicked(e:any) {
        console.log(e);
    }

    chartHovered(e:any) {
        console.log(e);
    }

    // Pie
    private pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    private pieChartData = [300, 500, 100];
    private pieChartType = 'Pie';
}