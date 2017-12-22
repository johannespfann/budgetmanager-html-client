"use strict";
var CategoryUpdatedMessage = (function () {
    function CategoryUpdatedMessage(aCategory) {
        this.category = aCategory;
    }
    CategoryUpdatedMessage.prototype.getCategory = function () {
        return this.category;
    };
    return CategoryUpdatedMessage;
}());
exports.CategoryUpdatedMessage = CategoryUpdatedMessage;
//# sourceMappingURL=category-updated-message.js.map