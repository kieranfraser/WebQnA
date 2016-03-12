System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OnlineUser;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by kfraser on 12/03/2016.
             */
            OnlineUser = (function () {
                function OnlineUser(name, picture) {
                    this.name = name;
                    this.picture = picture;
                }
                return OnlineUser;
            }());
            exports_1("OnlineUser", OnlineUser);
        }
    }
});

//# sourceMappingURL=../maps/models/online-user.js.map
