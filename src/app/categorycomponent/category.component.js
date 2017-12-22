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
var component_directive_1 = require("./component.directive");
var add_category_component_1 = require("./add-category.component");
var delete_category_component_1 = require("./delete-category.component");
var edit_category_component_1 = require("./edit-category.component");
var message_service_1 = require("../services/message.service");
var log_util_1 = require("../utils/log-util");
var category_updated_message_1 = require("../services/category-updated-message");
var category_added_message_1 = require("../services/category-added-message");
var category_deleted_message_1 = require("../services/category-deleted-message");
var CategoryComponent = (function () {
    function CategoryComponent(categoryService, componentFactoryResolver, messageService) {
        var _this = this;
        this.categoryService = categoryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.messageService = messageService;
        log_util_1.LogUtil.info(this, "Init CategoryComponent");
        this.categoryDeletedSubscription = messageService
            .of(category_deleted_message_1.CategoryDeletedMessage)
            .subscribe(function (data) {
            _this.updateCategories(data.getCategory());
        });
        this.categoryAddedSubscription = messageService
            .of(category_added_message_1.CategoryAddedMessage)
            .subscribe(function (data) {
            _this.updateCategories(data.getCategory());
        });
        this.categoryUpdatedSubscription = messageService
            .of(category_updated_message_1.CategoryUpdatedMessage)
            .subscribe(function (data) {
            _this.updateCategories(data.getCategory());
        });
        this.categories = categoryService.getCategories();
        this.name = "";
    }
    CategoryComponent.prototype.addNewCategory = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(add_category_component_1.AddCategoryComponent);
        var viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
    };
    CategoryComponent.prototype.deleteCategory = function (aCategory) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(delete_category_component_1.DeleteCategoryComponent);
        var viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.category = aCategory;
    };
    CategoryComponent.prototype.editCategory = function (aCategory) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(edit_category_component_1.EditCategoryComponent);
        var viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.category = aCategory;
    };
    CategoryComponent.prototype.updateCategories = function (aCategory) {
        log_util_1.LogUtil.info(this, 'Update categories');
        this.categories = this.categoryService.getCategories();
    };
    CategoryComponent.prototype.ngOnDestroy = function () {
        this.categoryUpdatedSubscription.unsubscribe();
        this.categoryDeletedSubscription.unsubscribe();
        this.categoryAddedSubscription.unsubscribe();
    };
    return CategoryComponent;
}());
__decorate([
    core_1.ViewChild(component_directive_1.ComponentDirective),
    __metadata("design:type", component_directive_1.ComponentDirective)
], CategoryComponent.prototype, "componentDirective", void 0);
CategoryComponent = __decorate([
    core_1.Component({
        selector: 'category-component',
        templateUrl: './category.component.html'
    }),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        core_1.ComponentFactoryResolver,
        message_service_1.MessagingService])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map