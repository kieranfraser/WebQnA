/**
 * Important! - when using ng2-bootstrap library, this reference path
 * tag must be added to the top of the component implementing the feature
 * in order for the typescript to compile. (Gulp will throw an error otherwise).
 */

/// <reference path="../typings/browser/definitions/moment/moment.d.ts" />

import {DashboardComponent} from "./dashboard.component";
import {Component, View, provide, OnInit} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate, OnActivate, ComponentInstruction} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {LandingComponent} from "./landing.component";
import {AboutComponent} from "./about.component";
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {HTTPService} from "./services/http-service";

/**
 * Auth0Lock provided by Auth0. Controls the user interface for SSO.
 * see https://github.com/auth0/lock for details.
 */
declare var Auth0Lock;

@Component({
    selector: 'app',
    providers: [HTTPService]
})

@View({
    directives: [ ROUTER_DIRECTIVES, DashboardComponent, Alert],
    templateUrl: 'views/app.html'
})

/**
 * These are the possible routes from the app.component. The landing page is set as default.
 * It also implements Auth0 for SSO via the login button (as pop up).
 * There is also a user metrics dashboard with the implementation - useful!
 */
@RouteConfig([
    {path: '/', name: 'Landing', component: LandingComponent, useAsDefault: true},
    {path: '/about', name: 'About', component: AboutComponent},
    {path: '/dash', name: 'Dashboard', component: DashboardComponent}
])

/**
 * This is the landing page component. Mainly managing the nav bar elements
 * and checking whether or not a user is already logged in to a session.
 */
export class AppComponent implements OnInit {

    /**
     * Using the Lock interface with these options means it's embeddable in the page. The
     * other option is the show() the Lock interface as a pop-up.
     * ToDo: (Low priority) Decide which is better, the pop-up or the embedded version.
     * The token response is the JWT necessary for user authentication throughout the application
     * when navigating to routes with the @canActivate restriction and also necessary for Auth0
     * api requests.
     * @type {{container: string, responseType: string}}
     */
    options = {
        //container: 'root',
        responseType: 'token'
    };

    /**
     * The lock instantiation requires the client id and domain respectively.
     * ToDo: These hardcoded authentication values need to be removed from GitHub!
     */
    lock = new Auth0Lock('deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5', 'qanda.eu.auth0.com');
    hash = this.lock.parseHash();
    jwtHelper: JwtHelper = new JwtHelper();
    thing: string;

    /**
     * The boolean which controls the login/logout button on the nav bar
     * @type {boolean}
     */
    public  userLoggedIn: boolean = false;
    public userProfile;

    constructor(private _router:Router, public http: Http, public authHttp: AuthHttp,
                private httpService: HTTPService) {}

    /**
     * On init must check if the user is logged in:
     * ToDo: redirect to the dashboard if the user is already logged in.
     *
     */
    ngOnInit() {
        console.log('Checking if the user is logged in on init.');
        if(tokenNotExpired()){
            this.userLoggedIn = true;
            this._router.navigateByUrl('/dash');
        }
    }

    /**
     * Function fired when the login button is pressed.
     *
     * Setting up the Lock UI
     * The lock.show() function sends the user's log-in details to the
     * Auth0 service securely (using OAuth2/ OpenID connect)
     * The response of the post request is a JWT and user profile details.
     * These are stored in localStorage for later use.
     * User then redirected to the dashboardComponent (child component of
     * app.component)
     */
    login(){
        console.log("Initializing the Auth0 form.");
        //this._parent.userLoggedIn = true;
        this.lock.show(this.options,(err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            console.log(
                this.jwtHelper.decodeToken(id_token),
                this.jwtHelper.getTokenExpirationDate(id_token)
            );
            var userId: string = JSON.parse(localStorage.getItem('profile')).user_id;

            // Get user details (joined classes, questions asked) from database
            this.httpService.getUserDetails(userId).subscribe(
                data => localStorage.setItem('user', JSON.stringify(data)),
                error => alert(error),
                () => console.log("get user details success")
            );
            this.userLoggedIn = true;
            console.log("Login successful, redirecting to the dashboard.");
            this._router.navigate(['Dashboard']);
        });
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
     * Utility function to change the state of the userLoggedIn
     * boolean which controls the state of the Login/Logout buttons
     * on the nav bar. This
     */
    setLoggedOut(){
        this.userLoggedIn = false;
    }

    /**
     * Utility function to change the state of the userLoggedIn
     * boolean which controls the state of the Login/Logout buttons
     * on the nav bar. This
     */
    setLoggedIn(){
        this.userLoggedIn = true;
        this.userProfile  = JSON.parse(localStorage.getItem('profile')).picture;
    }

    /**
     * Non-Authenticated api request example
     */
    getThing() {
        this.http.get('/ping')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    /**
     * Authenticated api request example:
     * ToDo: Save the user's id in the database - api request to express route
     */
    getSecretThing() {
        this.authHttp.get('/secured/ping')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    /**
     * Not sure what this does yet.. will come back to it!
     */
    tokenSubscription() {
        this.authHttp.tokenStream.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    /**
     * Helper method for getting the JWT from storage and getting
     * various details from it such as the expiration etc.
     * Can call for a refresh of the token if going to be expired and
     * user is still logged in - ToDo: Refresh token
     */
    useJwtHelper() {
        var token = localStorage.getItem('id_token');

        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        );
    }
}