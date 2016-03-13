/**
 * Created by kfraser on 13/03/2016.
 */
import {Component, Inject, forwardRef} from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare var io: any;

@Component({
    selector: 'class-list',
    templateUrl: 'views/dashboard/class_list_modal.html',
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

    save() {
        for(var a of this.classes){
            console.log(a);
        }
    }

}