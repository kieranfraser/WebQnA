import {Answer} from "./answer";
/**
 * Created by kfraser on 26/02/2016.
 */
export class Question {
    constructor(
        public classid: string,
        public question: string,
        public summary: string,
        public choices: string[],
        public answers: Answer[],
        public user: string,
        public date: string,
        public type: string,
        public anonymous: string
    ) {}
}