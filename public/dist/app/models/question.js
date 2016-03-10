System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Question;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by kfraser on 26/02/2016.
             */
            Question = (function () {
                function Question(classid, question, summary, choices, answers, user, date, type, anonymous, username, picture) {
                    this.classid = classid;
                    this.question = question;
                    this.summary = summary;
                    this.choices = choices;
                    this.answers = answers;
                    this.user = user;
                    this.date = date;
                    this.type = type;
                    this.anonymous = anonymous;
                    this.username = username;
                    this.picture = picture;
                }
                return Question;
            }());
            exports_1("Question", Question);
        }
    }
});

//# sourceMappingURL=../maps/models/question.js.map
