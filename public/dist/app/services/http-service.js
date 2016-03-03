System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var HTTPService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            HTTPService = (function () {
                function HTTPService(http) {
                    this.http = http;
                }
                /**
                 * Get a list of questions for a given class name (class
                 * names are unique)
                 * @param className
                 * @returns {Observable<R>}
                 */
                HTTPService.prototype.getQuestion = function (className) {
                    var queryString = '?classname=' + className;
                    return this.http.get('/api/getquestions' + queryString)
                        .map(function (res) { return res.json(); });
                };
                HTTPService.prototype.getSelectedQuestion = function (json) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/getselectedquestion', json, {
                        headers: headers
                    }).map(function (res) { return res.json(); });
                };
                /**
                 * Adds new question to question table. Adds id to the given class
                 * table. Adds question id to the user.
                 * @param json
                 * @returns {Observable<R>}
                 */
                HTTPService.prototype.addQuestion = function (json) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/addquestion', json, {
                        headers: headers
                    }).map(function (res) { return res.json(); });
                };
                HTTPService.prototype.updateQuestion = function (json) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/updatequestion', json, {
                        headers: headers
                    }).map(function (res) { return res.json(); });
                };
                HTTPService.prototype.getUserDetails = function (userId) {
                    var queryString = '?userid=' + userId;
                    return this.http.get('/api/getuser' + queryString)
                        .map(function (res) { return res.json(); });
                };
                HTTPService.prototype.addClass = function (json) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/addclass', json, {
                        headers: headers
                    }).map(function (res) { return res.json(); });
                };
                HTTPService.prototype.getAllClasses = function () {
                    return this.http.get('/api/getclasses')
                        .map(function (res) { return res.json(); });
                };
                HTTPService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HTTPService);
                return HTTPService;
            }());
            exports_1("HTTPService", HTTPService);
        }
    }
});

//# sourceMappingURL=../maps/services/http-service.js.map
