import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {OnActivate, ComponentInstruction} from "angular2/router";
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: 'dashboard',
    templateUrl: 'views/dashboard.html',
    directives: [ ROUTER_DIRECTIVES, DashboardComponent, CORE_DIRECTIVES]
})

@CanActivate(() => tokenNotExpired())

export class DashboardComponent implements OnActivate {

    public  userLoggedIn = true;

    id_token: string;

    routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
        console.log("Navigated to dashboard");
        this.id_token = localStorage.getItem('id_token');
        if(tokenNotExpired()){
            console.log("Not expired");
        }
        else{
            console.log('has expired and i have no idea');
        }
    }
    /*ngOnInit() {
        console.log('on init');
        this.id_token = localStorage.getItem('id_token');
        if(tokenNotExpired()){
            console.log("Not expired");
        }
        else{
            console.log('has expired and i have no idea');
        }
    }*/
}