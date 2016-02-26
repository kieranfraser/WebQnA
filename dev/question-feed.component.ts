/**
 * Created by kfraser on 26/02/2016.
 */
import {Component, View, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Alert, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: 'question-feed'
})

@View({
    templateUrl: 'views/question_feed.html',
    directives: [Alert, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})

/**
 * This is the main class for application - the dashboard.
 * Here the comment feed is visible to the logged in user.
 * The user can post comments, answer questions, join classes etc.
 */
export class QuestionFeedComponent implements OnInit {

    public comment = { question: "this is a question", author: "Kieran"};

    constructor() {}

    ngOnInit() {
        console.log("Feed Loaded");
    }

    private disabled:boolean = false;
    private status:{isopen:boolean} = {isopen: false};
    private items:Array<string> = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

    private toggled(open:boolean):void {
        console.log('Dropdown is now: ', open);
    }

    private toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
}