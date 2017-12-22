"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var add_entry_component_1 = require("./addentrycomponent/add-entry.component");
var welcome_component_1 = require("./welcomecomponent/welcome.component");
var page_not_found_component_1 = require("./errorcomponents/page-not-found.component");
var login_component_1 = require("./logincomponent/login.component");
var balance_component_1 = require("./balancecomponent/balance.component");
var category_component_1 = require("./categorycomponent/category.component");
var history_component_1 = require("./historycomponent/history.component");
var category_service_1 = require("./services/category.service");
var entry_service_1 = require("./services/entry.service");
var add_category_component_1 = require("./categorycomponent/add-category.component");
var edit_category_component_1 = require("./categorycomponent/edit-category.component");
var delete_category_component_1 = require("./categorycomponent/delete-category.component");
var component_directive_1 = require("./categorycomponent/component.directive");
var message_service_1 = require("./services/message.service");
var startup_service_1 = require("./services/startup.service");
var tag_service_1 = require("./services/tag.service");
function initApp(startupService) {
    return function () { return startupService.onStartup(); };
}
exports.initApp = initApp;
var AppModule = (function () {
    function AppModule() {
        console.log("Init Application");
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule, app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            welcome_component_1.WelcomeComponent,
            add_entry_component_1.AddEntryComponent,
            page_not_found_component_1.PageNotFoundComponent,
            balance_component_1.BalanceComponent,
            category_component_1.CategoryComponent,
            add_category_component_1.AddCategoryComponent,
            edit_category_component_1.EditCategoryComponent,
            delete_category_component_1.DeleteCategoryComponent,
            history_component_1.HistoryComponent,
            login_component_1.LoginComponent,
            component_directive_1.ComponentDirective
        ],
        entryComponents: [
            add_category_component_1.AddCategoryComponent,
            edit_category_component_1.EditCategoryComponent,
            delete_category_component_1.DeleteCategoryComponent
        ],
        providers: [
            category_service_1.CategoryService,
            entry_service_1.EntryService,
            message_service_1.MessagingService,
            tag_service_1.TagService,
            startup_service_1.StartupService,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: initApp,
                deps: [startup_service_1.StartupService, entry_service_1.EntryService, category_service_1.CategoryService, tag_service_1.TagService],
                multi: true
            },
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map