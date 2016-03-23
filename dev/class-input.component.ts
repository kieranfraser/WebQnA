/**
 * Created by kfraser on 27/02/2016.
 */
import {Component, View, Inject, forwardRef, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Alert, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {DashboardComponent} from "./dashboard.component";
import {Lecture} from "./models/lecture";
import {HTTPService} from "./services/http-service";
import {ClassListComponent} from "./class-list.component";
import {TagInputComponent} from "./form-utilities/tag-input.component";

@Component({
    selector: 'class-input',
    providers: [HTTPService],
    templateUrl: 'views/class_input.html',
    directives: [TagInputComponent]
})

/**
 * The form to create a new class. TODO: User has an auth field
 * TODO: this is so the lecturers and students can be distinguished - only give
 * TODO: the lecturers the power to use this component.
 */
export class ClassInputComponent implements OnInit {


    className:string = "";
    /**
     * Inject the dashboard to change the toggle button for viewing the
     * class creation well (disappears on submission).
     * @param _parent - Dashboard component
     */
    constructor(@Inject(forwardRef(() => ClassListComponent)) private _parent:ClassListComponent,
                private httpService: HTTPService) {}

    /**
     * Lecture is synonymous with class
     */
    newClass: Lecture;
    tags: string[] = [];

    ngOnInit() {}

    /**
     * Used to create a new class - TODO: change from profile to user when user is completed
     * Creator of the class is added as a participant.
     * @param value - input class name
     */
    addClass(){
        this.newClass = new Lecture(this.className, [JSON.parse(localStorage.getItem('profile')).user_id], [], this.tags);
        console.log(this.tags);
        var json = JSON.stringify(this.newClass);
        this.httpService.addClass(json).subscribe(
            data => console.log(JSON.stringify(data)),
            error => alert(error),
            () => console.log("Class added")
        );
        console.log(JSON.stringify(this.newClass));
        this.className = "";
        this.tags = [];
        this._parent.refresh();
        this._parent.isCollapsedClass = !this._parent.isCollapsedClass;
    }
}