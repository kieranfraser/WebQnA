
/**
 * Created by kfraser on 24/02/2016.
 */
import {Component, View, forwardRef, Inject} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Question} from "./models/question";
import {HTTPService} from "./services/http-service";
import {DatePipe} from "angular2/common";
import {DashboardComponent} from "./dashboard.component";

declare var io: any;

@Component({
    selector: 'question-input-form',
    providers: [HTTPService],
    inputs: ['selectedClass']
})

@View({
    templateUrl: 'views/question_input_form.html',
    directives: []
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 * TODO: get user id from user when user model is updated
 */
export class QuestionInputFormComponent{

    public types:string[] = ["Free-text", "Multi-choice"];
    public today:Date = new Date();
    selectedClass: string;

    socket = null;

    questionModel = new Question(this.selectedClass,
        "",
        "",
        [],
        [],
        JSON.parse(localStorage.getItem('profile')).user_id,
        this.today.toString(),
        this.types[0],
        "",
        JSON.parse(localStorage.getItem('profile')).name,
        JSON.parse(localStorage.getItem('profile')).picture);

    choiceOne: string = "";
    choiceTwo: string = "";
    choiceThree: string = "";
    choiceFour: string = "";



    constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent,
                private http: Http, private httpService: HTTPService){

        this.selectedClass = this._parent.selectedClass;

        /*this.socket = io('/');
        this.socket.on('update', function(){
            console.log('Message from server: question feed to be updated');
            this._parent.getQuestions();
        }.bind(this));*/
    }

    submitted = false;

    onSubmit(){
        this.submitted = true;

        this.today = new Date();
        console.log(this.questionModel);
        console.log(this.selectedClass);
        this.questionModel.classid = this.selectedClass;

        // logic for choices
        if(this.questionModel.type === 'Multi-choice'){
            console.log("the choices are:");
            console.log(this.questionModel.choices);
            this.questionModel.choices = [this.choiceOne, this.choiceTwo, this.choiceThree, this.choiceFour];
        }

        var json = JSON.stringify(this.questionModel);
        console.log(json);
        this.httpService.addQuestion(json).subscribe(
            data => console.log(JSON.stringify(data)),
            error => alert(error),
            () => console.log("post question success")
        );
        console.log(JSON.stringify(this.questionModel));

        this.questionModel = new Question(this.selectedClass,
            "",
            "",
            [],
            [],
            JSON.parse(localStorage.getItem('profile')).user_id,
            this.today.toString(),
            this.types[0],
            "",
            JSON.parse(localStorage.getItem('profile')).name,
            JSON.parse(localStorage.getItem('profile')).picture);

        this.socket.emit('update', 'question');
        this._parent.isCollapsedQuestion = !this._parent.isCollapsedQuestion;
        this._parent.getQuestions();
    }

}