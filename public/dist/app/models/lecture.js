System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Lecture;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by kfraser on 27/02/2016.
             */
            Lecture = (function () {
                function Lecture(name, participants, questions) {
                    this.name = name;
                    this.participants = participants;
                    this.questions = questions;
                }
                return Lecture;
            }());
            exports_1("Lecture", Lecture);
        }
    }
});

//# sourceMappingURL=../maps/models/lecture.js.map
