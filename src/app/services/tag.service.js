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
var log_util_1 = require("../utils/log-util");
var TagService = (function () {
    function TagService() {
        log_util_1.LogUtil.info(this, 'Init TagService');
        // TODO getAllTags from server
        this.tags = new Array();
    }
    TagService.prototype.addTag = function (aTag) {
        var found = this.tags.find(function (tag) {
            if (tag.name == aTag.name) {
                return true;
            }
        });
        log_util_1.LogUtil.info(this, 'found is: ' + found);
        if (found == null) {
            this.tags.push(aTag);
        }
    };
    TagService.prototype.getTags = function () {
        return null;
    };
    return TagService;
}());
TagService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map