"use strict";
var CategoryAddedMessage = (function () {
    function CategoryAddedMessage(aCategory) {
        this.category = aCategory;
    }
    CategoryAddedMessage.prototype.getCategory = function () {
        return this.category;
    };
    return CategoryAddedMessage;
}());
exports.CategoryAddedMessage = CategoryAddedMessage;
//# sourceMappingURL=category-added-message.js.map