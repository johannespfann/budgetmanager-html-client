"use strict";
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * Convert a number to a postitiv one. If the number
     * is 0 or a positiv number,
     * the number will returned.
     * @param value
     */
    MathUtil.convertToPositiv = function (value) {
        if (value > 0 || value == 0) {
            return value;
        }
        return value * -1;
    };
    /**
     * Convert a number to a negativ one. If the number
     * is 0 or a negativ number,
     * the number will returned.
     * @param value
     */
    MathUtil.convertToNegativ = function (value) {
        if (value < 0 || value == 0) {
            value = value;
        }
        return value * -1;
    };
    /**
     * Generate a positiv random number
     */
    MathUtil.generateRandom = function () {
        return Math.random();
    };
    return MathUtil;
}());
exports.MathUtil = MathUtil;
//# sourceMappingURL=math-util.js.map