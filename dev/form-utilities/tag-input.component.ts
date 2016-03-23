/**
 * Created by kfraser on 18/03/2016.
 */
import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Alert, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ClassInputComponent} from "../class-input.component";

@Component({
    selector: 'tag-input',
    inputs: ['tags'],
})

@View({
    templateUrl: 'views/form-utilities/tag_input.html',
    directives: [TYPEAHEAD_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES]
})

/**
 * The form to create a new class. TODO: User has an auth field
 * TODO: this is so the lecturers and students can be distinguished - only give
 * TODO: the lecturers the power to use this component.
 */
export class TagInputComponent{

    /**
     * Typeahead and tag input
     */

    private selected:string = '';
    private asyncSelected:string = '';
    private typeaheadLoading:boolean = false;
    private typeaheadNoResults:boolean = false;


    tags: string[];

    private states:Array<string> = [];

    private statesComplex:Array<any> = [];

    private getContext() {
        return this;
    }

    private _cache:any;
    private _prevContext:any;

    private getAsyncData(context:any):Function {
        if (this._prevContext === context) {
            return this._cache;
        }

        this._prevContext = context;
        let f:Function = function ():Promise<string[]> {
            let p:Promise<string[]> = new Promise((resolve:Function) => {
                setTimeout(() => {
                    let query = new RegExp(context.asyncSelected, 'ig');
                    return resolve(context.states.filter((state:any) => {
                        return query.test(state);
                    }));
                }, 200);
            });
            return p;
        };
        this._cache = f;
        return this._cache;
    }

    private changeTypeaheadLoading(e:boolean) {
        this.typeaheadLoading = e;
    }

    private changeTypeaheadNoResults(e:boolean) {
        this.typeaheadNoResults = e;
    }

    private typeaheadOnSelect(e:any) {
        console.log(`Selected value: ${e.item}`);
    }

    onKey(value){
        if(value.code === 'Comma'){
            var newTag: string = this.selected.substring(0, this.selected.length-1);
            var index = this.tags.indexOf(newTag, 0);
            if (index === -1) {
                this.tags.push(newTag);
                this.addToTypeahead(newTag);
                this.selected = '';
            }
        }

        if(value.code === 'Enter'){
            return false;
        }
    }

    addToTypeahead(newTag: string){
        var index = this.states.indexOf(newTag, 0);
        if (index === -1) {
            this.states.push(newTag);
            this.statesComplex = [];
            var counter:number = 1;
            for (var state of this.states) {
                this.statesComplex.push({id: counter, name: state});
                counter++;
            }
        }
    }

    removeTag(tag:string){
        var index = this.tags.indexOf(tag, 0);
        if (index > -1) {
            this.tags.splice(index, 1);
        }
        index = this.states.indexOf(tag, 0);
        if (index > -1) {
            this.states.splice(index, 1);
        }
        var result = this.statesComplex.filter(function( obj ) {
            return obj.name == tag; })[0];
        this.statesComplex.splice(result.id-1, 1);
    }
}

