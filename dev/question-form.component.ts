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
    providers: [HTTPService]
})

@View({
    templateUrl: 'views/question_input_form.html',
    directives: []
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 */
export class QuestionInputFormComponent{

    public classes:string[] = ["Select a Class","CS1234", "CS56456"];
    public types:string[] = ["Free-text", "Multi-choice"];
    public today:Date = new Date();
    questionModel = new Question(this.classes[1], "", "", [], "", this.today.toDateString(), this.types[0], "");


    constructor(private http: Http, private httpService: HTTPService){}

    submitted = false;

    onSubmit(){
        this.submitted = true;

        var json = JSON.stringify(this.questionModel);
        this.httpService.postNewQuestion(json).subscribe(
            data => console.log(JSON.stringify(data)),
            error => alert(error),
            () => console.log("post question success")
        );
        console.log(JSON.stringify(this.questionModel));
        this.questionModel = new Question("", "", "", [], "", "", "", "");
    }

}