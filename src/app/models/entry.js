"use strict";
var category_1 = require("./category");
var date_util_1 = require("../utils/date-util");
var hash_util_1 = require("../utils/hash-util");
var Entry = (function () {
    function Entry() {
        this.tags = new Array();
    }
    Entry.copy = function (aEntry) {
        var entry = new Entry();
        entry.id = aEntry.id;
        entry.amount = aEntry.amount;
        entry.creation_date = aEntry.creation_date;
        // Copy Category if category is not undefined
        if (aEntry.category) {
            var category = category_1.Category.copy(aEntry.category);
            entry.category = category;
        }
        entry.memo = aEntry.memo;
        // TODO Copy Tags when using tags 
        // TODO Test copy Tags - slice should not enough
        var tags = new Array();
        tags = aEntry.tags.slice();
        return entry;
    };
    Entry.create = function (aAmount) {
        var entry = new Entry();
        entry.amount = aAmount;
        entry.creation_date = date_util_1.DateUtil.getCurrentDate();
        entry.id = hash_util_1.HashUtil.getUniqueHash(aAmount.toString());
        return entry;
    };
    /**
     * setter
     */
    Entry.prototype.setAmount = function (aAmount) {
        this.amount = aAmount;
    };
    Entry.prototype.setMemo = function (aMemo) {
        this.memo = aMemo;
    };
    Entry.prototype.setCategory = function (aCategory) {
        this.category = aCategory;
    };
    Entry.prototype.addTag = function (aTag) {
        this.tags.push(aTag);
    };
    /**
     * getter
     */
    Entry.prototype.getId = function () {
        return this.id;
    };
    Entry.prototype.getAmount = function () {
        return this.amount;
    };
    Entry.prototype.getMemo = function () {
        return this.memo;
    };
    Entry.prototype.getCreationDate = function () {
        return this.creation_date;
    };
    Entry.prototype.getCategory = function () {
        return this.category;
    };
    Entry.prototype.getTags = function () {
        return this.tags;
    };
    return Entry;
}());
exports.Entry = Entry;
//# sourceMappingURL=entry.js.map