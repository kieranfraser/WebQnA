/**
 * Created by kfraser on 26/02/2016.
 */
/**
 * Created by kfraser on 24/02/2016.
 */
import {Component, View} from 'angular2/core';
import {Question} from "./model/question";

@Component({
    selector: 'question-input-form'
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
    questionModel = new Question("", "", [], "", "", "", "");

    submitted = false;

    onSubmit(){
        this.submitted = true;
        console.log(JSON.stringify(this.questionModel));
    }

    get diagnostic(){
        return JSON.stringify(this.questionModel);
    }

}