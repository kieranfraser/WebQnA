System.register(['angular2/core', 'angular2/router', "angular2/common", "./app.component", "ng2-bootstrap/ng2-bootstrap", "./question-feed.component", "./question-form.component", "./services/http-service", "./models/question", "./models/online-user", "./class-list.component", "./lecturer-auth.component"], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, common_1, app_component_1, ng2_bootstrap_1, question_feed_component_1, question_form_component_1, http_service_1, question_1, ng2_bootstrap_2, online_user_1, class_list_component_1, lecturer_auth_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
                ng2_bootstrap_2 = ng2_bootstrap_1_1;
            },
            function (question_feed_component_1_1) {
                question_feed_component_1 = question_feed_component_1_1;
            },
            function (question_form_component_1_1) {
                question_form_component_1 = question_form_component_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            },
            function (online_user_1_1) {
                online_user_1 = online_user_1_1;
            },
            function (class_list_component_1_1) {
                class_list_component_1 = class_list_component_1_1;
            },
            function (lecturer_auth_component_1_1) {
                lecturer_auth_component_1 = lecturer_auth_component_1_1;
            }],
        execute: function() {
            let DashboardComponent = class DashboardComponent {
                /**
                 * For the constructor must inject the parent "loginComponent" as
                 * need to change parent variables which control button states (e.g.
                 * the login/logout button in this case)
                 * @param _parent
                 */
                constructor(_parent, httpService) {
                    this._parent = _parent;
                    this.httpService = httpService;
                    this.emptyFeed = true;
                    this.classes = [];
                    this.selectedClass = '';
                    this.isCollapsedQuestion = true;
                    /**
                     * List of online users - update using socket.io
                     */
                    this.socket = null;
                    this.onlineUsers = [];
                    /**
                     * User
                     */
                    this.userClasses = [];
                    console.log("Set user as logged in (button state)");
                    _parent.setLoggedIn();
                    this.socket = _parent.socket;
                    this.socket.on('onlineUserList', function (list) {
                        console.log('Online User List: ' + list);
                        this.onlineUsers = list;
                    }.bind(this));
                    var newUserOnline = new online_user_1.OnlineUser(JSON.parse(localStorage.getItem('profile')).name, JSON.parse(localStorage.getItem('profile')).picture, JSON.parse(localStorage.getItem('profile')).user_id);
                    this.socket.emit('userLogin', newUserOnline);
                    console.log("adding self to online user list");
                    this.onlineUsers.push(newUserOnline);
                }
                /**
                 * This is called in child component instead of onInit because
                 * it's called when this component is routed to while onInit isn't
                 * (onInit may only be activated when the component is created? not
                 * sure must come back to this.. there were issues on the angular2 forum)
                 * TODO: first navigation to dashboard, update the online user list
                 * @param next
                 * @param prev
                 */
                ngOnInit() {
                    console.log("Navigated to dashboard");
                    this.id_token = localStorage.getItem('id_token');
                    // populate the class dropdown box and load the question feed
                    this.getClassList();
                    // get all user questions
                    this.userQuestionIds = JSON.parse(localStorage.getItem('user')).questions;
                }
                classChange(value) {
                    console.log("changed");
                    console.log(value);
                    this.selectedClass = value['class'];
                    this.getQuestions();
                }
                getClassList() {
                    var classListArray = [];
                    this.httpService.getAllClasses().subscribe(data => classListArray = JSON.parse(JSON.stringify(data)), error => alert(error), () => this.getUpdatedUser(classListArray));
                }
                getUpdatedUser(classListArray) {
                    // Get user details (joined classes, questions asked) from database
                    var userid = JSON.parse(localStorage.getItem('profile')).user_id;
                    this.httpService.getUserDetails(userid).subscribe(data => localStorage.setItem('user', JSON.stringify(data)), error => alert(error), () => this.populateAllClassesModal(classListArray));
                }
                populateAllClassesModal(classListArray) {
                    this.classes = [];
                    this.userClasses = JSON.parse(localStorage.getItem('user')).lectures;
                    for (var item of classListArray) {
                        var joined = true;
                        if (this.userClasses != null) {
                            if (this.userClasses.indexOf(JSON.parse(JSON.stringify(item)).name) === -1) {
                                joined = false;
                            }
                        }
                        else {
                            joined = false;
                        }
                        this.classes.push({ 'class': JSON.parse(JSON.stringify(item)).name, 'joined': joined });
                    }
                    this.getQuestions();
                }
                getQuestions() {
                    var questionListArray = [];
                    this.httpService.getQuestion(this.selectedClass).subscribe(data => questionListArray = JSON.parse(JSON.stringify(data)), error => alert(error), () => this.populateFeed(questionListArray));
                }
                populateFeed(questionArray) {
                    this.questions = [];
                    for (var item of questionArray) {
                        console.log((JSON.parse(JSON.stringify(item)).classid));
                        var question = new question_1.Question((JSON.parse(JSON.stringify(item)).classid), (JSON.parse(JSON.stringify(item)).question), (JSON.parse(JSON.stringify(item)).summary), (JSON.parse(JSON.stringify(item)).choices), (JSON.parse(JSON.stringify(item)).answers), (JSON.parse(JSON.stringify(item)).userid), (JSON.parse(JSON.stringify(item)).date), (JSON.parse(JSON.stringify(item)).type), (JSON.parse(JSON.stringify(item)).anonymous), (JSON.parse(JSON.stringify(item)).username), (JSON.parse(JSON.stringify(item)).picture));
                        this.questions.push(question);
                    }
                    if (this.questions.length > 0) {
                        this.emptyFeed = false;
                    }
                    else {
                        this.emptyFeed = true;
                    }
                }
            };
            DashboardComponent = __decorate([
                core_1.Component({
                    selector: 'dashboard',
                    providers: [http_service_1.HTTPService]
                }),
                core_1.View({
                    templateUrl: 'views/dashboard.html',
                    directives: [router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.Alert, question_feed_component_1.QuestionFeedComponent,
                        question_form_component_1.QuestionInputFormComponent, class_list_component_1.ClassListComponent, lecturer_auth_component_1.LecturerAuthComponent,
                        ng2_bootstrap_1.Collapse, ng2_bootstrap_2.BUTTON_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                }),
                __param(0, core_1.Inject(core_1.forwardRef(() => app_component_1.AppComponent))), 
                __metadata('design:paramtypes', [app_component_1.AppComponent, http_service_1.HTTPService])
            ], DashboardComponent);
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});

//# sourceMappingURL=maps/dashboard.component.js.map
