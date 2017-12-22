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
var log_util_1 = require("../utils/log-util");
var message_service_1 = require("./message.service");
var category_updated_message_1 = require("./category-updated-message");
var category_added_message_1 = require("./category-added-message");
var category_deleted_message_1 = require("./category-deleted-message");
var CategoryService = (function () {
    function CategoryService(messageService) {
        this.messageService = messageService;
        log_util_1.LogUtil.info(this, "Init CategoryService");
        var category = category_1.Category.create("Allgmein");
        this.defaultCategory = category;
        this.categories = this.initTestDate();
    }
    CategoryService.prototype.update = function (aCategory) {
        for (var index in this.categories) {
            if (this.categories[index].getId() === aCategory.getId()) {
                this.categories[index] = aCategory;
            }
        }
        this.messageService.publish(new category_updated_message_1.CategoryUpdatedMessage(category_1.Category.copy(aCategory)));
        log_util_1.LogUtil.debug(this, 'Update Category');
    };
    CategoryService.prototype.getDefaultCategory = function () {
        log_util_1.LogUtil.debug(this, "Return DefaultCategory: " + JSON.stringify(this.defaultCategory));
        return category_1.Category.copy(this.defaultCategory);
    };
    CategoryService.prototype.getCategories = function () {
        var newCategories = new Array();
        for (var _i = 0, _a = this.categories; _i < _a.length; _i++) {
            var category = _a[_i];
            newCategories.push(category_1.Category.copy(category));
        }
        log_util_1.LogUtil.debug('Return categories: ' + this, JSON.stringify(newCategories));
        return newCategories;
    };
    CategoryService.prototype.addNewCategory = function (aCategory) {
        if (this.isAlreadyExists(aCategory.getName())) {
            // TODO handle error in front-end
            log_util_1.LogUtil.error(this, 'Category already exists: ' + aCategory.getName());
            return;
        }
        this.categories.push(aCategory);
        this.messageService.publish(new category_added_message_1.CategoryAddedMessage(category_1.Category.copy(aCategory)));
        log_util_1.LogUtil.debug(this, "Added new Category: " + JSON.stringify(aCategory));
    };
    CategoryService.prototype.delete = function (aCategory, aFallBackCategory) {
        var _this = this;
        if (aFallBackCategory || aCategory) {
            if (aFallBackCategory.getId() == aCategory.getId()) {
                return;
            }
        }
        if (aCategory.getName() == this.defaultCategory.getName()) {
            log_util_1.LogUtil.error(this, 'Category are not allowed to delete!');
            return;
        }
        this.categories.filter(function (category) {
            if (aCategory.getId() == category.getId()) {
                var index = _this.categories.findIndex(function (cat) { return cat.getId() == category.getId(); });
                _this.categories.splice(index, 1);
            }
        });
        this.messageService.publish(new category_deleted_message_1.CategoryDeletedMessage(aCategory, aFallBackCategory));
    };
    CategoryService.prototype.isAlreadyExists = function (aName) {
        for (var _i = 0, _a = this.categories; _i < _a.length; _i++) {
            var category = _a[_i];
            if (category.getName() === aName) {
                return true;
            }
        }
        return false;
    };
    CategoryService.prototype.initTestDate = function () {
        var category2 = category_1.Category.create("Haushalt");
        var category3 = category_1.Category.create("Einnahmen");
        var categories = new Array();
        categories.push(this.defaultCategory);
        categories.push(category2);
        categories.push(category3);
        return categories;
    };
    return CategoryService;
}());
CategoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessagingService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map