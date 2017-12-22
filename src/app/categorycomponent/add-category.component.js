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
var category_1 = require("../models/category");
var category_service_1 = require("../services/category.service");
var message_service_1 = require("../services/message.service");
var log_util_1 = require("../utils/log-util");
var AddCategoryComponent = (function () {
    function AddCategoryComponent(categoryService, messageService) {
        this.categoryService = categoryService;
        this.messageService = messageService;
        log_util_1.LogUtil.debug(this, "Init AddCategoryComponent");
        this.name = "";
    }
    AddCategoryComponent.prototype.save = function () {
        log_util_1.LogUtil.info(this, "Add new category! " + this.name);
        if (this.name == null) {
            return;
        }
        var category = category_1.Category.create(this.name);
        this.categoryService.addNewCategory(category);
        this.clearView();
    };
    AddCategoryComponent.prototype.clearView = function () {
        this.name = "";
    };
    return AddCategoryComponent;
}());
AddCategoryComponent = __decorate([
    core_1.Component({
        selector: 'add-category-component',
        templateUrl: './add-category.component.html'
    }),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        message_service_1.MessagingService])
], AddCategoryComponent);
exports.AddCategoryComponent = AddCategoryComponent;
//# sourceMappingURL=add-category.component.js.map