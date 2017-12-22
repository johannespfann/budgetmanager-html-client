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
var entry_1 = require("../models/entry");
var math_util_1 = require("../utils/math-util");
var category_service_1 = require("../services/category.service");
var entry_service_1 = require("../services/entry.service");
var log_util_1 = require("../utils/log-util");
var AddEntryComponent = (function () {
    function AddEntryComponent(categoryService, entryService) {
        this.categoryService = categoryService;
        this.entryService = entryService;
        this.algebraicSignIsMinus = true;
        log_util_1.LogUtil.info(this, 'Invoke AddEntryComponent');
        this.algebraicSignIsMinus = true;
        this.amount;
        this.memo = "";
        this.categories = categoryService.getCategories();
        this.category = categoryService.getDefaultCategory();
        log_util_1.LogUtil.info(this, 'DefaultCategory: ' + JSON.stringify(this.category));
    }
    AddEntryComponent.prototype.save = function () {
        log_util_1.LogUtil.info(this, 'press save');
        var amountValue;
        if (this.algebraicSignIsMinus) {
            amountValue = math_util_1.MathUtil.convertToNegativ(this.amount);
        }
        else {
            amountValue = math_util_1.MathUtil.convertToPositiv(this.amount);
        }
        var entry = entry_1.Entry.create(amountValue);
        entry.setMemo(this.memo);
        log_util_1.LogUtil.info(this, "Category: " + JSON.stringify(this.category));
        entry.setCategory(this.category);
        this.entryService.addEntry(entry);
        log_util_1.LogUtil.info(this, 'save : ' + JSON.stringify(entry));
        this.cleanAttributes();
    };
    AddEntryComponent.prototype.cleanAttributes = function () {
        this.amount = null;
        this.memo = null;
        this.category = this.categoryService.getDefaultCategory();
        log_util_1.LogUtil.info(this, 'Cleaned View');
    };
    AddEntryComponent.prototype.changeAlgebraicSignIsMinus = function () {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        }
        else {
            this.algebraicSignIsMinus = true;
        }
    };
    AddEntryComponent.prototype.changed = function (aCategory) {
        log_util_1.LogUtil.info(this, 'Changed: ' + JSON.stringify(aCategory));
    };
    return AddEntryComponent;
}());
AddEntryComponent = __decorate([
    core_1.Component({
        selector: 'newentry',
        templateUrl: './add-entry.component.html'
    }),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        entry_service_1.EntryService])
], AddEntryComponent);
exports.AddEntryComponent = AddEntryComponent;
//# sourceMappingURL=add-entry.component.js.map