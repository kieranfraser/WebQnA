System.register(['angular2/core', 'angular2/common', 'ng2-charts'], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_charts_1;
    var DoughnutChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_charts_1_1) {
                ng2_charts_1 = ng2_charts_1_1;
            }],
        execute: function() {
            let DoughnutChartComponent = class DoughnutChartComponent {
                constructor() {
                    // Doughnut
                    this.doughnutChartLabels = ['Participated', 'Yet to Participate'];
                    this.doughnutChartData = [7, 20];
                    this.doughnutChartType = 'Doughnut';
                }
                ngOnInit() {
                }
                ngOnChanges() {
                }
                // events
                chartClicked(e) {
                    console.log(e);
                }
                chartHovered(e) {
                    console.log(e);
                }
            };
            DoughnutChartComponent = __decorate([
                core_1.Component({
                    selector: 'doughnut-chart',
                    templateUrl: '../views/graphs/doughnut_chart.html',
                    inputs: ['selectedQuestion'],
                    directives: [ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                }), 
                __metadata('design:paramtypes', [])
            ], DoughnutChartComponent);
            exports_1("DoughnutChartComponent", DoughnutChartComponent);
        }
    }
});

//# sourceMappingURL=../maps/graphs/doughnut-chart.component.js.map
