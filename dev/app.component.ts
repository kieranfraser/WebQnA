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

@RouteConfig([
    {path: '/', name: 'Landing', component: LandingComponent, useAsDefault: true},
    {path: '/login/...', name: 'Login', component: LoginComponent},
    {path: '/about', name: 'About', component: AboutComponent}
])

export class AppComponent implements OnInit {

    public  userLoggedIn = false;

    constructor(private _router:Router, public http: Http) {}

    ngOnInit() {
        console.log('Checking if the user is logged in on init.');
        if(tokenNotExpired()){
            this.userLoggedIn = true;
        }
    }

    login(){
        this._router.navigate(['Login']);
    }

    logout() {
        console.log('User has logged out. Redirect to landing page.');
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.userLoggedIn = false;
        this._router.navigate(['Landing']);
    }

    checkUserLoggedIn(){
        if(this.userLoggedIn){
            return true;
        }
        else{
            return false;
        }
    }

    changeUserLogInState(){
        if(this.userLoggedIn){
            this.userLoggedIn = false;
        }
        else{
            this.userLoggedIn = true;
        }
    }
}