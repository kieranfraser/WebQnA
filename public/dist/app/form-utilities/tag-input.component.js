System.register(['angular2/core', 'angular2/common', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_bootstrap_1;
    var TagInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            TagInputComponent = (function () {
                function TagInputComponent() {
                    /**
                     * Typeahead and tag input
                     */
                    this.selected = '';
                    this.asyncSelected = '';
                    this.typeaheadLoading = false;
                    this.typeaheadNoResults = false;
                    this.states = [];
                    this.statesComplex = [];
                }
                TagInputComponent.prototype.getContext = function () {
                    return this;
                };
                TagInputComponent.prototype.getAsyncData = function (context) {
                    if (this._prevContext === context) {
                        return this._cache;
                    }
                    this._prevContext = context;
                    var f = function () {
                        var p = new Promise(function (resolve) {
                            setTimeout(function () {
                                var query = new RegExp(context.asyncSelected, 'ig');
                                return resolve(context.states.filter(function (state) {
                                    return query.test(state);
                                }));
                            }, 200);
                        });
                        return p;
                    };
                    this._cache = f;
                    return this._cache;
                };
                TagInputComponent.prototype.changeTypeaheadLoading = function (e) {
                    this.typeaheadLoading = e;
                };
                TagInputComponent.prototype.changeTypeaheadNoResults = function (e) {
                    this.typeaheadNoResults = e;
                };
                TagInputComponent.prototype.typeaheadOnSelect = function (e) {
                    console.log("Selected value: " + e.item);
                };
                TagInputComponent.prototype.onKey = function (value) {
                    if (value.code === 'Comma') {
                        var newTag = this.selected.substring(0, this.selected.length - 1);
                        var index = this.tags.indexOf(newTag, 0);
                        if (index === -1) {
                            this.tags.push(newTag);
                            this.addToTypeahead(newTag);
                            this.selected = '';
                        }
                    }
                    if (value.code === 'Enter') {
                        return false;
                    }
                };
                TagInputComponent.prototype.addToTypeahead = function (newTag) {
                    var index = this.states.indexOf(newTag, 0);
                    if (index === -1) {
                        this.states.push(newTag);
                        this.statesComplex = [];
                        var counter = 1;
                        for (var _i = 0, _a = this.states; _i < _a.length; _i++) {
                            var state = _a[_i];
                            this.statesComplex.push({ id: counter, name: state });
                            counter++;
                        }
                    }
                };
                TagInputComponent.prototype.removeTag = function (tag) {
                    var index = this.tags.indexOf(tag, 0);
                    if (index > -1) {
                        this.tags.splice(index, 1);
                    }
                    index = this.states.indexOf(tag, 0);
                    if (index > -1) {
                        this.states.splice(index, 1);
                    }
                    var result = this.statesComplex.filter(function (obj) {
                        return obj.name == tag;
                    })[0];
                    this.statesComplex.splice(result.id - 1, 1);
                };
                TagInputComponent = __decorate([
                    core_1.Component({
                        selector: 'tag-input',
                        inputs: ['tags'],
                    }),
                    core_1.View({
                        templateUrl: 'views/form-utilities/tag_input.html',
                        directives: [ng2_bootstrap_1.TYPEAHEAD_DIRECTIVES, common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TagInputComponent);
                return TagInputComponent;
            }());
            exports_1("TagInputComponent", TagInputComponent);
        }
    }
});

//# sourceMappingURL=../maps/form-utilities/tag-input.component.js.map
