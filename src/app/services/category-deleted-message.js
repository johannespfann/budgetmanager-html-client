"use strict";
var CategoryDeletedMessage = (function () {
    function CategoryDeletedMessage(aDeletedCategory, aFallBackCategory) {
        this.deletedCategory = aDeletedCategory;
        this.fallbackCategory = aFallBackCategory;
    }
    CategoryDeletedMessage.prototype.getCategory = function () {
        return this.deletedCategory;
    };
    CategoryDeletedMessage.prototype.getFallBackCategory = function () {
        return this.fallbackCategory;
    };
    return CategoryDeletedMessage;
}());
exports.CategoryDeletedMessage = CategoryDeletedMessage;
//# sourceMappingURL=category-deleted-message.js.map