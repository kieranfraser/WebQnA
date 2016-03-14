/**
 * Created by kfraser on 13/03/2016.
 */
import {Component, Inject, forwardRef} from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {User} from "./models/user";
import {HTTPService} from "./services/http-service";
import {DashboardComponent} from "./dashboard.component";

declare var io: any;

@Component({
    selector: 'class-list',
    templateUrl: 'views/class_list_modal.html',
    directives: [ BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    inputs: ['classes'],
})

/**
 * This component is a modal that appears when the user clicks on the all
 * classes button on the dashboard.
 */
export class ClassListComponent{

    private singleModel:string = '1';
    private radioModel:string = 'Middle';

    public classes;

    user: User;

    constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent,
                private httpService: HTTPService) {}

    save() {
        var joinedList :string[] = [];
        for(var lecture of this.classes){
            if(lecture['joined'] === true){
                joinedList.push(lecture['class'])
            }
        }
        this.user = new User(JSON.parse(localStorage.getItem('profile')).user_id,
        joinedList,
        [],
        [],
        "",
        "");

        var json = JSON.stringify(this.user);
        this.httpService.updateUserClasses(json).subscribe(
            data => console.log(JSON.stringify(data)),
            error => alert(error),
            () => console.log("User classes updated")
        );
    }

}