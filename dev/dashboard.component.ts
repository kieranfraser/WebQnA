import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";

@Component({
    selector: 'dashboard',
    template: `
    <h1>This is the User Dashboard (Only visible after log in!)</h1>
    <hr>
  `
})

@CanActivate(() => tokenNotExpired())

export class DashboardComponent implements OnInit{

    constructor(
        private _router:Router,
        private _routeParams:RouteParams){}

    ngOnInit() {
        let id_token = this._routeParams.get('token');
        localStorage.setItem('id_token', id_token);
    }
}