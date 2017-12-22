"use strict";
var math_util_1 = require("./math-util");
var HashUtil = (function () {
    function HashUtil() {
    }
    /**
     * Generate a unique hash of an given input
     * @param aInput
     */
    HashUtil.getUniqueHash = function (aInput) {
        var unique = '';
        unique = unique + math_util_1.MathUtil.generateRandom();
        return unique;
    };
    return HashUtil;
}());
exports.HashUtil = HashUtil;
//# sourceMappingURL=hash-util.js.map