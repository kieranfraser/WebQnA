/**
 * Created by kfraser on 21/02/2016.
 */
import {DashboardComponent} from "./dashboard.component";
import { CORE_DIRECTIVES } from 'angular2/common';
import {Component, View, provide, Inject, forwardRef} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {OnInit} from "angular2/core";
import {error} from "util";
import {Alert} from "ng2-bootstrap/ng2-bootstrap"
import {DefaultEmptyComponent} from "./default-empty.component";
import {AppComponent} from "./app.component";

/**
 * Auth0Lock provided by Auth0. Controls the user interface for SSO.
 * see https://github.com/auth0/lock for details.
 */
declare var Auth0Lock;

@Component({
    selector: 'login'
})

@View({
    templateUrl: 'views/login.html',
    directives: [ ROUTER_DIRECTIVES, DashboardComponent]
})

@RouteConfig([
    {path: '/', name: 'Default', component: DefaultEmptyComponent, useAsDefault: true},
    {path: '/dash', name: 'Dashboard', component: DashboardComponent}
])

/**
 * This is the class which controls the sign-up/log-in process. It implements Auth0 for SSO.
 * There is also a user metrics dashboard with the implementation - useful!
 */
export class LoginComponent {

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
        container: 'root',
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
     * The constructor for this class must contain the injected parent (in this case this is the
     * app.component) as values from the parent need to be changed in future child components.
     * @param _parent - AppComponent - which contains the nav bar
     * @param _router - need to use the same router
     * @param http - for calling api services
     * @param authHttp - for securely calling api services
     */
    constructor(@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent,
                private _router:Router,public http: Http, public authHttp: AuthHttp) {
        console.log(_parent.userLoggedIn);
        _parent.changeUserLogInState();
    }

    /**
     * Called on initialization - setting up the Lock UI
     * The lock.show() function sends the user's log-in details to the
     * Auth0 service securely (using OAuth2/ OpenID connect)
     * The response of the post request is a JWT and user profile details.
     * These are stored in localStorage for later use.
     * User then redirected to the dashboardComponent (child component of
     * this component)
     */
    ngOnInit(){
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
            console.log(JSON.stringify(profile));

            console.log("Login successful, redirecting to the dashboard.");
            this._router.navigate(['Dashboard']);
        });
    }

    /**
     * Non-Authenticated api request example
     */
    getThing() {
        this.http.get('http://localhost:3001/ping')
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
        this.authHttp.get('http://localhost:3001/secured/ping')
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

    /**
     * Method used to change the state of the log-in/log-out buttons in the
     * app.component. (Used by child components - propogates changes upwards)
     */
    changeUserLogInState(){
        this._parent.changeUserLogInState();
    }
}