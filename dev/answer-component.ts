/**
 * Created by kfraser on 29/02/2016.
 */
import {Component, Inject, forwardRef} from 'angular2/core';
import {QuestionFeedComponent} from "./question-feed.component";
import {Question} from "./models/question";
import {Collapse} from "ng2-bootstrap/ng2-bootstrap";
import {BarGraphComponent} from "./graphs/bar-graph.component";
import {AnswerInputFormComponent} from "./answer-form.component";
import {HTTPService} from "./services/http-service";
import {Answer} from "./models/answer";

declare var io: any;

@Component({
    selector: 'answer-question',
    templateUrl: 'views/answer_question.html',
    inputs: ['question'],
    directives: [Collapse, BarGraphComponent, AnswerInputFormComponent],
    providers: [HTTPService]
})

/**
 * This component is a modal that appears when the user clicks on a question in the
 * dashboard question feed. Includes an input form for answering questions.
 */
export class AnswerQuestionComponent{

    socket = null;

    public isCollapsedAnswer:boolean = true;
    public isCollapsedStats:boolean = true;

    question = new Question("","","",[],[],"","","","");
    /**
     * 1. Get the question that was clicked.
     * 2. Create wells for each answer in the question.answer array.
     * 3. Create an input field for adding an answer.
     * 4. On submit, add the the answer to the question.answer array and update the question.
     */
    constructor(@Inject(forwardRef(() => QuestionFeedComponent))private _parent: QuestionFeedComponent,
                private httpService: HTTPService){
        this.socket = io('/');
        this.socket.on('answer', function(){
            console.log('Message from server: answer feed to be updated!!');
            this.getUpdatedSelectedQuestion();
        }.bind(this));
    }

    updateQuestions(){
        this._parent.updateQuestions();
    }

    getUpdatedSelectedQuestion(){
        var updatedQuestion;
        var json = JSON.stringify(this.question);
        this.httpService.getSelectedQuestion(json).subscribe(
            data => updatedQuestion = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => this.setQuestion(updatedQuestion)
        );
    }

    /**
     * ToDo: This could be cleaned up to be more efficient.
     * @param updatedQuestion
     */
    setQuestion(updatedQuestion){
        var questionArray = [];
        for(var item of updatedQuestion){
            console.log((JSON.parse(JSON.stringify(item)).classid));
            var question = new Question(
                (JSON.parse(JSON.stringify(item)).classid),
                (JSON.parse(JSON.stringify(item)).question),
                (JSON.parse(JSON.stringify(item)).summary),
                (JSON.parse(JSON.stringify(item)).choices),
                (JSON.parse(JSON.stringify(item)).answers),
                (JSON.parse(JSON.stringify(item)).userid),
                (JSON.parse(JSON.stringify(item)).date),
                (JSON.parse(JSON.stringify(item)).type),
                (JSON.parse(JSON.stringify(item)).anonymous));
            this.question = question;
        }

        //this.question.answers = answers;answers;
        console.log(this.question);
    }
}