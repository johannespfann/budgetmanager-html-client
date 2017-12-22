"use strict";
var hash_util_1 = require("../utils/hash-util");
var Category = (function () {
    function Category() {
        // Default
    }
    Category.copy = function (aCategory) {
        var category = new Category();
        category.id = aCategory.id;
        category.name = aCategory.name;
        return category;
    };
    Category.create = function (aName) {
        var category = new Category();
        category.id = hash_util_1.HashUtil.getUniqueHash(null);
        category.name = aName;
        return category;
    };
    /**
     * setter
     */
    Category.prototype.setName = function (aName) {
        this.id = this.id;
    };
    /**
     * getter
     */
    Category.prototype.getId = function () {
        return this.id;
    };
    Category.prototype.getName = function () {
        return this.name;
    };
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map