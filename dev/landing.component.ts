/**
 * Created by kfraser on 24/02/2016.
 */
///<reference path="../typings/browser/definitions/moment/moment.d.ts" />

import {Component, View, provide} from 'angular2/core';
import {Alert} from'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'landing'
})

@View({
    templateUrl: 'views/landing.html',
    directives: [Alert]
})

/**
 * Component for the landing page - seen first by the user (set as useAsDefault)
 * ToDo: Must add stuff to the landing.html
 */
export class LandingComponent {

}