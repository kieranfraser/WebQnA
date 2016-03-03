import {Component, View, Inject, forwardRef, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";
import {CORE_DIRECTIVES, FORM_DIRECTIVES } from "angular2/common";
import {AppComponent} from "./app.component";
import {Alert, Collapse} from "ng2-bootstrap/ng2-bootstrap";
import {QuestionFeedComponent} from "./question-feed.component";
import {QuestionInputFormComponent} from "./question-form.component";
import {ClassInputComponent} from "./class-input.component";
import {HTTPService} from "./services/http-service";
import {Question} from "./models/question";

@Component({
    selector: 'dashboard',
    providers: [HTTPService]
})

@View({
    templateUrl: 'views/dashboard.html',
    directives: [ ROUTER_DIRECTIVES, Alert, QuestionFeedComponent,
        ClassInputComponent , QuestionInputFormComponent, Collapse]
})

/**
 *
 * This means the user can only navigate to this route if they have a JWT and
 * it hasn't expired yet. Not too sure how to refresh this and manage the lifecycle
 * (could be checking if a JWT is in localStorage? must confirm)
 */
//@CanActivate(() => tokenNotExpired())

/**
 * This is the main class for application - the dashboard.
 * Here the comment feed is visible to the logged in user.
 * The user can post comments, answer questions, join classes etc.
 */
export class DashboardComponent implements OnInit {

    /**
     * This is the JWT for the user's authentication
     */
    id_token: string;
    emptyFeed: boolean = true;

    public classes:string[] = [];
    public userQuestionIds: string[];
    public selectedClass:string;
    questions: Question[];

    public isCollapsedQuestion:boolean = true;
    public isCollapsedClass:boolean = true;
    /**
     * For the constructor must inject the parent "loginComponent" as
     * need to change parent variables which control button states (e.g.
     * the login/logout button in this case)
     * @param _parent
     */
    constructor(@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent,
                private httpService: HTTPService) {
        console.log("Set user as logged in (button state)");
        _parent.setLoggedIn();
    }

    /**
     * This is called in child component instead of onInit because
     * it's called when this component is routed to while onInit isn't
     * (onInit may only be activated when the component is created? not
     * sure must come back to this.. there were issues on the angular2 forum)
     * @param next
     * @param prev
     */
    ngOnInit() {
        console.log("Navigated to dashboard");
        this.id_token = localStorage.getItem('id_token');

        // populate the class dropdown box and load the question feed
        this.getClassList();
        // get all user questions
        this.userQuestionIds = JSON.parse(localStorage.getItem('user')).questions;
    }

    classChange(value:string){
        console.log("changed");
        this.selectedClass = value;
        this.getQuestions();
    }

    getClassList(){
        var classListArray = [];
        this.httpService.getAllClasses().subscribe(
            data => classListArray = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => this.populateClassDropdown(classListArray)
        );
    }

    populateClassDropdown(classListArray:JSON[]){
        this.classes = [];
        for(var item of classListArray){
            this.classes.push(JSON.parse(JSON.stringify(item)).name);
        }
        this.selectedClass = this.classes[0];
        this.getQuestions();
    }

    getQuestions(){
        var questionListArray = [];
        this.httpService.getQuestion(this.selectedClass).subscribe(
            data => questionListArray = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => this.populateFeed(questionListArray)
        );
    }

    populateFeed(questionArray: JSON[]){
        this.questions = [];
        for(var item of questionArray){
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
            this.questions.push(question);
        }
        if(this.questions.length > 0){
            this.emptyFeed = false;
        }
        else{
            this.emptyFeed = true;
        }
    }
}