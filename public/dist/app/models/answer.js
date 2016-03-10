/**
 * Created by kfraser on 01/03/2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Answer;
    return {
        setters:[],
        execute: function() {
            Answer = (function () {
                function Answer(answer, user, date, anonymous, username, picture) {
                    this.answer = answer;
                    this.user = user;
                    this.date = date;
                    this.anonymous = anonymous;
                    this.username = username;
                    this.picture = picture;
                }
                return Answer;
            }());
            exports_1("Answer", Answer);
        }
    }
});

//# sourceMappingURL=../maps/models/answer.js.map
