"use strict";
var AbstractMessage = (function () {
    function AbstractMessage(aChannel) {
        this.channel = aChannel;
    }
    AbstractMessage.prototype.getChannelName = function () {
        return this.channel;
    };
    return AbstractMessage;
}());
exports.AbstractMessage = AbstractMessage;
//# sourceMappingURL=abstract-message.js.map