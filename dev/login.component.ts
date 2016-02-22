/**
 * Created by kfraser on 21/02/2016.
 */
import {Component} from 'angular2/core';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
    selector: 'login',
    template: `
    <h1 *ngIf="!loggedIn()">You must login to view the sweet sweet questions</h1>
    <h1 *ngIf="loggedIn()">
        This the login screen brah, need to go forward to see those sweet sweet questions!
        Or logout I guess...
    </h1>
    <hr>
  `
})

export class LoginComponent {

    loggedIn() {
        return tokenNotExpired();
    }
}