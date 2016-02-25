/**
 * Created by kfraser on 24/02/2016.
 */
import {Component} from 'angular2/core';

@Component({
    selector: 'default-empty',
    template: ''
})

/**
 * This is a default component - intentionally empty (including the
 * html) as it's needed when a child must have a terminal state.
 */
export class DefaultEmptyComponent{}