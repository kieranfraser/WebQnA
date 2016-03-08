/**
 * Created by kfraser on 26/02/2016.
 */
import {Component, View, Inject, forwardRef, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Alert, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {Question} from "./models/question";
import {HTTPService} from "./services/http-service";
import {AnswerQuestionComponent} from "./answer-component";
import {DashboardComponent} from "./dashboard.component";

@Component({
    selector: 'question-feed',
    providers: [HTTPService],
    inputs: ['classValue', 'questions']
})

@View({
    templateUrl: 'views/question_feed.html',
    directives: [Alert, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, AnswerQuestionComponent]
})

/**
 * This is the question feed component. It loads a set of questions related to
 * a selected class.
 */
export class QuestionFeedComponent implements OnInit {

    // Input from the dashboard component, used to filter the comment feed
    classValue: string;
    questions: Question[];

    selectedQuestion: Question;

    constructor( private httpService: HTTPService,
                 @Inject(forwardRef(() => DashboardComponent)) private _parent: DashboardComponent) {}

    ngOnInit() {
        console.log("Feed Loaded");
        this.selectedQuestion = new Question("","","",[],[],"","","","");
        // get the list of questions for the given class
    }

    clickedQuestion(question: Question){
        this.selectedQuestion = question;
    }

    updateQuestions(){
        this._parent.getQuestions();
    }
}