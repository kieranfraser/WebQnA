/**
 * Created by kfraser on 26/02/2016.
 */
/**
 * Created by kfraser on 24/02/2016.
 */
import {Component, View} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Question} from "./models/question";
import {HTTPService} from "./services/http-service";
import {DatePipe} from "angular2/common";

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

    questionModel = new Question(this.selectedClass,
        "",
        "",
        [],
        JSON.parse(localStorage.getItem('profile')).user_id,
        this.today.toDateString(),
        this.types[0],
        "");


    constructor(private http: Http, private httpService: HTTPService){}

    submitted = false;

    onSubmit(){
        this.submitted = true;

        this.today = new Date();
        console.log(this.questionModel);
        console.log(this.selectedClass);
        this.questionModel.classid = this.selectedClass;

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
            JSON.parse(localStorage.getItem('profile')).user_id,
            this.today.toDateString(),
            this.types[0],
            "");
    }

}