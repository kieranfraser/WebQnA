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
import {BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap"
import {OnlineUser} from "./models/online-user";
import {ClassListComponent} from "./class-list.component";
import {LecturerAuthComponent} from "./lecturer-auth.component";
import {User} from "./models/user";

declare var io: any;

@Component({
    selector: 'dashboard',
    providers: [HTTPService]
})

@View({
    templateUrl: 'views/dashboard.html',
    directives: [ ROUTER_DIRECTIVES, Alert, QuestionFeedComponent,
        QuestionInputFormComponent, ClassListComponent, LecturerAuthComponent,
        Collapse,BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ]
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
 * TODO: Important! investigate why slow/hanging requests when two instances
 * TODO: of the application are open on the same machine (possibly socket.io problem)
 */
export class DashboardComponent implements OnInit {

    /**
     * This is the JWT for the user's authentication
     */
    id_token: string;
    emptyFeed: boolean = true;

    public classes:any[] = [];
    public userQuestionIds: string[];
    public selectedClass:string = '';
    questions: Question[];

    public isCollapsedQuestion:boolean = true;

    /**
     * List of online users - update using socket.io
     */
    socket = null;
    onlineUsers: OnlineUser[] = [];

    /**
     * User
     */
    public userClasses = [];

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
        this.socket = _parent.socket;

        this.socket.on('onlineUserList', function(list){
            console.log('Online User List: '+ list);
            this.onlineUsers = list;
        }.bind(this));

        var newUserOnline = new OnlineUser(JSON.parse(localStorage.getItem('profile')).name,
            JSON.parse(localStorage.getItem('profile')).picture, JSON.parse(localStorage.getItem('profile')).user_id);

        this.socket.emit('userLogin', newUserOnline);
        console.log("adding self to online user list");
        this.onlineUsers.push(newUserOnline);
    }

    /**
     * This is called in child component instead of onInit because
     * it's called when this component is routed to while onInit isn't
     * (onInit may only be activated when the component is created? not
     * sure must come back to this.. there were issues on the angular2 forum)
     * TODO: first navigation to dashboard, update the online user list
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
        console.log(value);
        this.selectedClass = value['class'];
        this.getQuestions();
    }

    getClassList(){
        var classListArray = [];
        this.httpService.getAllClasses().subscribe(
            data => classListArray = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => this.getUpdatedUser(classListArray)
        );
    }

    getUpdatedUser(classListArray){
        // Get user details (joined classes, questions asked) from database
        var userid :string = JSON.parse(localStorage.getItem('profile')).user_id;
        this.httpService.getUserDetails(userid).subscribe(
            data => localStorage.setItem('user', JSON.stringify(data)),
            error => alert(error),
            () => this.populateAllClassesModal(classListArray)
        );
    }

    populateAllClassesModal(classListArray:JSON[]){
        this.classes = [];
        this.userClasses = JSON.parse(localStorage.getItem('user')).lectures;
        for(var item of classListArray){
            var joined: boolean = true;
            if(this.userClasses != null){
                if(this.userClasses.indexOf(JSON.parse(JSON.stringify(item)).name) === -1){
                    joined = false;
                }
            }
            else{
                joined = false;
            }
            this.classes.push({'class':JSON.parse(JSON.stringify(item)).name, 'joined': joined});
        }
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
                (JSON.parse(JSON.stringify(item)).anonymous),
                (JSON.parse(JSON.stringify(item)).username),
                (JSON.parse(JSON.stringify(item)).picture));
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