/**
 * Created by kfraser on 27/02/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Response, Headers, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HTTPService {
    constructor(private http: Http){}

    /**
     * Get a list of questions for a given class name (class
     * names are unique)
     * @param className
     * @returns {Observable<R>}
     */
    getQuestion(className: string){
        let queryString = '?classname='+className;
        return this.http.get('/api/getquestions'+queryString)
            .map(res => res.json());
    }

    getSelectedQuestion(json: string){
        var headers = new Headers();
        headers.append('Content-Type',
            'application/json');

        return this.http.post('/api/getselectedquestion',
            json, {
                headers: headers
            }).map( res => res.json());
    }

    /**
     * Adds new question to question table. Adds id to the given class
     * table. Adds question id to the user.
     * @param json
     * @returns {Observable<R>}
     */
    addQuestion(json: string){

        var headers = new Headers();
        headers.append('Content-Type',
        'application/json');

        return this.http.post('/api/addquestion',
        json, {
                headers: headers
            }).map( res => res.json());
    }

    updateQuestion(json: string){
        var headers = new Headers();
        headers.append('Content-Type',
            'application/json');

        return this.http.post('/api/updatequestion',
            json, {
                headers: headers
            }).map( res => res.json());
    }

    getUserDetails(userId: string){
        let queryString = '?userid='+userId;
        return this.http.get('/api/getuser'+queryString)
        .map(res => res.json());
    }

    addClass(json: string){
        var headers = new Headers();
        headers.append('Content-Type',
            'application/json');

        return this.http.post('/api/addclass',
            json, {
                headers: headers
            }).map( res => res.json());
    }

    getAllClasses(){
        return this.http.get('/api/getclasses')
            .map(res => res.json());
    }

}
