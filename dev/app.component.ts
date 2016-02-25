/**
 * Important! - when using ng2-bootstrap library, this reference path
 * tag must be added to the top of the component implementing the feature
 * in order for the typescript to compile. (Gulp will throw an error otherwise).
 */

/// <reference path="../typings/browser/definitions/moment/moment.d.ts" />

import {DashboardComponent} from "./dashboard.component";
import {Component, View, provide, OnInit} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {LoginComponent} from "./login.component";
import {LandingComponent} from "./landing.component";
import {tokenNotExpired} from 'angular2-jwt';
import {AboutComponent} from "./about.component";


@Component({
    selector: 'app'
})

@View({
    directives: [ ROUTER_DIRECTIVES, LoginComponent],
    templateUrl: 'views/app.html'
})

/**
 * These are the possible routes from the app.component. The landing page is set as default.
 * The login component is set up to have child components, hence the difference in syntax.
 * Important - a child component must have a terminal state (useAsDefault set) otherwise
 * an error will be thrown.
 */
@RouteConfig([
    {path: '/', name: 'Landing', component: LandingComponent, useAsDefault: true},
    {path: '/login/...', name: 'Login', component: LoginComponent},
    {path: '/about', name: 'About', component: AboutComponent}
])

/**
 * This is the landing page component. Mainly managing the nav bar elements
 * and checking whether or not a user is already logged in to a session.
 */
export class AppComponent implements OnInit {

    /**
     * The boolean which controls the login/logout button on the nav bar
     * @type {boolean}
     */
    public  userLoggedIn = false;

    constructor(private _router:Router, public http: Http) {}

    /**
     * On init must check if the user is logged in:
     * ToDo: redirect to the dashboard if the user is already logged in.
     *
     */
    ngOnInit() {
        console.log('Checking if the user is logged in on init.');
        if(tokenNotExpired()){
            this.userLoggedIn = true;
        }
    }

    /**
     * Function fired when the login button is pressed.
     * Redirects to the login route which contains the auth0
     * api interface.
     */
    login(){
        this._router.navigate(['Login']);
    }

    /**
     * Function fired when the logout button is pressed. Deletes the user's JWT
     * and profile from local storage, sets the logged in boolean as false so the
     * login button is redisplayed and redirects to the landing page of the site.
     */
    logout() {
        console.log('User has logged out. Redirect to landing page.');
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.userLoggedIn = false;
        this._router.navigate(['Landing']);
    }

    /**
     * Checks whether or not the user is logged in.
     * @returns {boolean}
     */
    checkUserLoggedIn(){
        if(this.userLoggedIn){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Utility function to change the state of the userLoggedIn
     * boolean which controls the state of the Login/Logout buttons
     * on the nav bar. This function is used in child components.
     */
    changeUserLogInState(){
        if(this.userLoggedIn){
            this.userLoggedIn = false;
        }
        else{
            this.userLoggedIn = true;
        }
    }
}