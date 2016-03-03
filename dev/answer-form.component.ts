/**
 * Created by kfraser on 01/03/2016.
 */
import {Component, Inject, forwardRef} from 'angular2/core';
import {AnswerQuestionComponent} from "./answer-component";
import {Answer} from "./models/answer";
import {Question} from "./models/question";
import {HTTPService} from "./services/http-service";

declare var io: any;

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

    socket = null;

    selectedQuestion: Question;
    answerModel = new Answer(
        "",
        "",
        "",
        ""
    );
    public now:Date = new Date();
    submitted: boolean = false;

    constructor(@Inject(forwardRef(()=>AnswerQuestionComponent)) private _parent: AnswerQuestionComponent,
                private httpService: HTTPService){
        this.selectedQuestion = _parent.question;

        this.socket = io('/');
    }

    onSubmit(){
        this.submitted = true;

        this.now = new Date();
        this.answerModel.user = JSON.parse(localStorage.getItem('profile')).user_id;
        this.answerModel.date = this.now.toString();


        this.selectedQuestion.answers.push(this.answerModel);
        console.log('this is the question');
        console.log(this.selectedQuestion);

        var json = JSON.stringify(this.selectedQuestion);
        this.httpService.updateQuestion(json).subscribe(
            data => console.log(JSON.stringify(data)),
            error => alert(error),
            () => this.sendUpdate()
        );

        this.answerModel = new Answer(
            "",
            "",
            "",
            ""
        );
    }

    sendUpdate(){
        console.log("post answer success")
        this.socket.emit('update', 'answer');
    }

}