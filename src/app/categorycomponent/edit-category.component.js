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
var log_util_1 = require("../utils/log-util");
var EditCategoryComponent = (function () {
    function EditCategoryComponent(categoryService) {
        this.categoryService = categoryService;
        log_util_1.LogUtil.debug(this, 'Init EditCategoryComponent');
    }
    EditCategoryComponent.prototype.update = function (aCategory) {
        log_util_1.LogUtil.info(this, 'Pressed updateCategory');
        this.categoryService.update(aCategory);
    };
    EditCategoryComponent.prototype.ngOnInit = function () {
        log_util_1.LogUtil.debug(this, "OnInit of EditCategoryComponent");
        log_util_1.LogUtil.debug(this, JSON.stringify(this.category));
        this.updatedCategory = category_1.Category.copy(this.category);
    };
    return EditCategoryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", category_1.Category)
], EditCategoryComponent.prototype, "category", void 0);
EditCategoryComponent = __decorate([
    core_1.Component({
        selector: 'edit-category-component',
        templateUrl: './edit-category.component.html'
    }),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], EditCategoryComponent);
exports.EditCategoryComponent = EditCategoryComponent;
//# sourceMappingURL=edit-category.component.js.map