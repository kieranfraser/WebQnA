/**
 * Created by kfraser on 29/02/2016.
 */
import {Component} from 'angular2/core';

@Component({
    selector: 'answer-question',
    templateUrl: 'views/answer_question.html'
})

/**
 * This component is a modal that appears when the user clicks on a question in the
 * dashboard question feed. Includes an input form for answering questions.
 */
export class AnswerQuestionComponent{

    /**
     * 1. Get the question that was clicked.
     * 2. Create wells for each answer in the question.answer array.
     * 3. Create an input field for adding an answer.
     * 4. On submit, add the the answer to the question.answer array and update the question.
     */
}