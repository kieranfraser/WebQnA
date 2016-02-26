import {Component, View, Inject, forwardRef, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {AppComponent} from "./app.component";
import {Alert} from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: 'dashboard'
})

@View({
    templateUrl: 'views/dashboard.html',
    directives: [ ROUTER_DIRECTIVES, DashboardComponent, Alert]
})

/**
 * This means the user can only navigate to this route if they have a JWT and
 * it hasn't expired yet. Not too sure how to refresh this and manage the lifecycle
 * (could be checking if a JWT is in localStorage? must confirm)
 */
@CanActivate(() => tokenNotExpired())

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

    /**
     * For the constructor must inject the parent "loginComponent" as
     * need to change parent variables which control button states (e.g.
     * the login/logout button in this case)
     * @param _parent
     */
    constructor(@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) {
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
    }
}