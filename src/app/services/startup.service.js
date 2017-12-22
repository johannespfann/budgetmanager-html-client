"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var log_util_1 = require("../utils/log-util");
var core_1 = require("@angular/core");
var StartupService = (function () {
    function StartupService() {
    }
    StartupService.prototype.onStartup = function () {
        log_util_1.LogUtil.info(this, 'onStartup');
    };
    return StartupService;
}());
StartupService = __decorate([
    core_1.Injectable()
], StartupService);
exports.StartupService = StartupService;
//# sourceMappingURL=startup.service.js.map