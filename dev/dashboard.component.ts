import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: 'dashboard',
    templateUrl: 'views/dashboard.html'
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