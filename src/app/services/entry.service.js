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
var category_service_1 = require("./category.service");
var log_util_1 = require("../utils/log-util");
var category_1 = require("../models/category");
var message_service_1 = require("./message.service");
var category_updated_message_1 = require("./category-updated-message");
var category_deleted_message_1 = require("./category-deleted-message");
var entries_modified_message_1 = require("./entries-modified-message");
var EntryService = (function () {
    function EntryService(categoryService, messageService) {
        var _this = this;
        this.categoryService = categoryService;
        this.messageService = messageService;
        log_util_1.LogUtil.debug(this, "Init EntryService");
        this.entries = this.initTestData();
        this.categoryUpdatedSubscription = messageService
            .of(category_updated_message_1.CategoryUpdatedMessage)
            .subscribe(function (data) {
            _this.updateCategory(category_1.Category.copy(data.getCategory()));
        });
        this.categoryDeletedSubscription = messageService
            .of(category_deleted_message_1.CategoryDeletedMessage)
            .subscribe(function (data) {
            _this.replaceCategory(data.getCategory(), data.getFallBackCategory());
        });
    }
    EntryService.prototype.replaceCategory = function (aFromCategory, aToCategory) {
        this.entries.filter(function (entry) {
            if (entry.getCategory().getId() == aFromCategory.getId()) {
                entry.setCategory(aToCategory);
            }
        });
        this.messageService.publish(new entries_modified_message_1.EntriesModifiedMessage());
    };
    EntryService.prototype.updateCategory = function (aCategory) {
        this.entries.filter(function (entry) {
            if (entry.getCategory().getId() == aCategory.getId()) {
                entry.setCategory(aCategory);
            }
        });
    };
    EntryService.prototype.getEntries = function () {
        var newEntries = new Array();
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            newEntries.push(entry_1.Entry.copy(entry));
        }
        return newEntries;
    };
    EntryService.prototype.addEntry = function (aEntry) {
        this.entries.push(aEntry);
    };
    EntryService.prototype.deleteEntry = function (aEntry) {
        this.entries = this.deleteElementByIndex(this.entries, this.findIndexOfElementById(aEntry));
    };
    EntryService.prototype.findIndexOfElementById = function (aEntry) {
        for (var index in this.entries) {
            if (aEntry.getId() == this.entries[index].getId()) {
                log_util_1.LogUtil.info(this, "Index" + index);
                return Number(index);
            }
        }
        throw new Error("could not find element: " + JSON.stringify(aEntry));
    };
    EntryService.prototype.deleteElementByIndex = function (aEntries, aIndex) {
        var removedElements = aEntries.splice(aIndex, 1);
        log_util_1.LogUtil.debug(this, 'Remove elements: ' + JSON.stringify(removedElements));
        return aEntries;
    };
    EntryService.prototype.update = function (aEntry) {
        var index = this.findIndexOfElementById(aEntry);
        this.entries[index] = aEntry;
    };
    // TODO Delete method after testing!
    EntryService.prototype.initTestData = function () {
        var categories = this.categoryService.getCategories();
        var memoText = "Eine Notiz mit viel Inhalt."
            + " Viel Inhalt deswegen, weil es auch viel zu erzählen gibt.";
        var entry1 = entry_1.Entry.create(-200);
        entry1.setCategory(categories[1]);
        entry1.setMemo(memoText);
        var entry2 = entry_1.Entry.create(200);
        entry2.setCategory(categories[2]);
        entry2.setMemo(memoText);
        var entry3 = entry_1.Entry.create(-5.50);
        entry3.setCategory(categories[0]);
        entry3.setMemo(memoText);
        var entries = new Array();
        entries.push(entry3);
        entries.push(entry2);
        entries.push(entry1);
        return entries;
    };
    return EntryService;
}());
EntryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        message_service_1.MessagingService])
], EntryService);
exports.EntryService = EntryService;
//# sourceMappingURL=entry.service.js.map