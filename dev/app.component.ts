import {DashboardComponent} from "./dashboard.component";
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {OnInit} from "angular2/core";
import {error} from "util";
import {LoginComponent} from "./login.component";

declare var Auth0Lock;

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES, DashboardComponent ],
    template: `
    <h1>Qanda</h1>
    <div id="root" style="width: 280px; margin: 40px auto; padding: 10px; border-width: 1px;">
        embeded area
    </div>
    <div class="main">
        <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
        <router-outlet></router-outlet>
    </div>
  `
})

@RouteConfig([
    {path: '/', name:'Login', component: LoginComponent},
    {path: '/dash/:token', name:'Dashboard', component: DashboardComponent}
])

export class AppComponent {

    options = {
        container: 'root',
        responseType: 'token'
    };

    lock = new Auth0Lock('deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5', 'qanda.eu.auth0.com');
    hash = this.lock.parseHash();
    jwtHelper: JwtHelper = new JwtHelper();
    thing: string;

    constructor(private _router:Router,public http: Http, public authHttp: AuthHttp) {}

    ngOnInit(){
        //this.lock.show(this.options);
        if(!this.loggedIn()){
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

                this._router.navigate(['Dashboard', {token: id_token}]);
                /*this.authHttp.get('/dash').subscribe(
                    data => this.thing = data,
                    err => console.log(err),
                    () => console.log('Request Complete')
                );*/
            });
        }
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


    login() {
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

        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this._router.navigate(['Login']);
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

            this._router.navigate(['Dashboard', {token: id_token}]);
            /*this.authHttp.get('/dash').subscribe(
             data => this.thing = data,
             err => console.log(err),
             () => console.log('Request Complete')
             );*/
        });
    }

    loggedIn() {

       /* var token    = localStorage.getItem('id_token')
        if(token != null){
            if(this.jwtHelper.isTokenExpired(token)){
                console.log("false");
                return false;
            }
            else{
                console.log("true");
                return true;
            }
        }
        else{
            return false;
        }*/
        return tokenNotExpired();



    }

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