System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by kfraser on 13/03/2016.
             */
            /**
             * Created by kfraser on 27/02/2016.
             */
            User = (function () {
                function User(userid, classes, questions, notifications, auth, anonymous) {
                    this.userid = userid;
                    this.classes = classes;
                    this.questions = questions;
                    this.notifications = notifications;
                    this.auth = auth;
                    this.anonymous = anonymous;
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});

//# sourceMappingURL=../maps/models/user.js.map
