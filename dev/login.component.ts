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

declare var Auth0Lock;

@Component({
    selector: 'login'
})

@View({
    templateUrl: 'views/login.html',
    directives: [ ROUTER_DIRECTIVES, DashboardComponent, CORE_DIRECTIVES]
})

@RouteConfig([
    {path: '/', name: 'Default', component: DefaultEmptyComponent, useAsDefault: true},
    {path: '/dash', name: 'Dashboard', component: DashboardComponent}
])

export class LoginComponent {

    options = {
        container: 'root',
        responseType: 'token'
    };

    lock = new Auth0Lock('deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5', 'qanda.eu.auth0.com');
    hash = this.lock.parseHash();
    jwtHelper: JwtHelper = new JwtHelper();
    thing: string;

    //constructor(private _router:Router,public http: Http, public authHttp: AuthHttp) {}

    constructor(@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent,
                private _router:Router,public http: Http, public authHttp: AuthHttp) {
        console.log(_parent.userLoggedIn);
        _parent.changeUserLogInState();
    }


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
            /*this.authHttp.get('/dash').subscribe(
             data => this.thing = data,
             err => console.log(err),
             () => console.log('Request Complete')
             );*/
        });
    }

    /*  Pop Up Log in
     ngOnInit(){
     //this.lock.show(this.options);
     if (this.hash) {
     if (this.hash.error) {
     console.log("There was an error logging in", this.hash.error);
     } else {
     this.lock.getProfile(this.hash.id_token, function(err, profile) {
     if (err) {
     console.log('Cannot get user :(', err);
     return;
     }
     console.log("Hey dude", profile);
     });
     }
     }
     this.lock.show(this.options);
     }*/

    getThing() {
        this.http.get('http://localhost:3001/ping')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    getSecretThing() {
        this.authHttp.get('http://localhost:3001/secured/ping')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    tokenSubscription() {
        this.authHttp.tokenStream.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    useJwtHelper() {
        var token = localStorage.getItem('id_token');

        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        );
    }
}