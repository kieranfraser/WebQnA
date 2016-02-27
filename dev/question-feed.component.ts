/**
 * Created by kfraser on 26/02/2016.
 */
import {Component, View, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Alert, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: 'question-feed',
    inputs: ['classValue']
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

    // Input from the dashboard component, used to filter the comment feed
    classValue: string;

    constructor() {}

    ngOnInit() {
        console.log("Feed Loaded");
    }

}