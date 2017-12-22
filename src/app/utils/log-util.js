"use strict";
var LogUtil = (function () {
    function LogUtil() {
    }
    LogUtil.info = function (aObject, aMessage) {
        console.log(' [info] ' + aObject.constructor.name + ' : ' + aMessage);
    };
    LogUtil.debug = function (aObject, aMessage) {
        console.log(' [debug] ' + aObject.constructor.name + ' : ' + aMessage);
    };
    LogUtil.error = function (aObject, aMessage) {
        console.log(' [error] ' + aObject.constructor.name + ' : ' + aMessage);
    };
    LogUtil.logMessages = function (aObject, aMessage) {
        console.log(' [info] ' + aObject.constructor.name + ' : ' + aMessage);
    };
    return LogUtil;
}());
exports.LogUtil = LogUtil;
//# sourceMappingURL=log-util.js.map