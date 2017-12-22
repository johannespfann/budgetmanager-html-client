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
var category_service_1 = require("../services/category.service");
var category_1 = require("../models/category");
var log_util_1 = require("../utils/log-util");
var message_service_1 = require("../services/message.service");
var DeleteCategoryComponent = (function () {
    function DeleteCategoryComponent(categoryService, messageService) {
        this.categoryService = categoryService;
        this.messageService = messageService;
        log_util_1.LogUtil.debug(this, 'Init DeleteCategoryComponent');
    }
    DeleteCategoryComponent.prototype.ngOnInit = function () {
        log_util_1.LogUtil.debug(this, "OnInit of DeleteCategoryComponent");
        log_util_1.LogUtil.debug(this, JSON.stringify(this.category));
        this.defaultCategory = this.categoryService.getDefaultCategory();
        this.categories = this.filterCurrentCategory(this.categoryService.getCategories(), this.category);
    };
    DeleteCategoryComponent.prototype.changed = function (aCategory) {
        log_util_1.LogUtil.info(this, 'Selected: ' + aCategory.getName());
        this.selectedCategory = aCategory;
    };
    DeleteCategoryComponent.prototype.deleteCategory = function () {
        log_util_1.LogUtil.info(this, 'Pressed delete category');
        log_util_1.LogUtil.info(this, ' - Delete : ' + this.category.getName());
        log_util_1.LogUtil.info(this, ' - Replace: ' + this.selectedCategory.getName());
        this.categoryService.delete(this.category, this.selectedCategory);
    };
    DeleteCategoryComponent.prototype.filterCurrentCategory = function (aCategories, aCategory) {
        return aCategories.filter(function (category) { return category.getId() != aCategory.getId(); });
    };
    return DeleteCategoryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", category_1.Category)
], DeleteCategoryComponent.prototype, "category", void 0);
DeleteCategoryComponent = __decorate([
    core_1.Component({
        selector: 'delete-category-component',
        templateUrl: './delete-category.component.html'
    }),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        message_service_1.MessagingService])
], DeleteCategoryComponent);
exports.DeleteCategoryComponent = DeleteCategoryComponent;
//# sourceMappingURL=delete-category.component.js.map