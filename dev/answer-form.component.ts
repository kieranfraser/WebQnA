/**
 * Created by kfraser on 01/03/2016.
 */
import {Component, Inject, forwardRef} from 'angular2/core';
import {AnswerQuestionComponent} from "./answer-component";
import {Answer} from "./models/answer";
import {Question} from "./models/question";
import {HTTPService} from "./services/http-service";

@Component({
    selector: 'answer-input-form',
    templateUrl: 'views/answer_input_form.html',
    inputs: ['selectedQuestion'],
    providers: [HTTPService],
    directives: []
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 */
export class AnswerInputFormComponent{

    selectedQuestion: Question;
    answerModel = new Answer(
        "",
        "",
        "",
        ""
    );
    public today:Date = new Date();
    submitted: boolean = false;

    constructor(@Inject(forwardRef(()=>AnswerQuestionComponent)) private _parent: AnswerQuestionComponent,
                private httpService: HTTPService){
        this.selectedQuestion = _parent.question;
    }

}