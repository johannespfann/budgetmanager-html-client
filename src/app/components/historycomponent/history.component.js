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
var entry_service_1 = require("../services/entry.service");
var log_util_1 = require("../utils/log-util");
var HistoryComponent = (function () {
    function HistoryComponent(entryService) {
        this.entryService = entryService;
        this.entries = this.sortByTime(entryService.getEntries());
    }
    HistoryComponent.prototype.sortByTime = function (aEntries) {
        return aEntries.sort(function (a, b) {
            return b.getCreationDate() - a.getCreationDate();
        });
    };
    HistoryComponent.prototype.deleteEntry = function (aEntry) {
        log_util_1.LogUtil.info(this, 'delete entry: ' + JSON.stringify(aEntry));
        this.entryService.deleteEntry(aEntry);
        this.updateEntries();
    };
    HistoryComponent.prototype.updateEntries = function () {
        log_util_1.LogUtil.info(this, 'update entries');
        this.entries = this.entryService.getEntries();
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    core_1.Component({
        selector: 'history-component',
        templateUrl: './history.component.html'
    }),
    __metadata("design:paramtypes", [entry_service_1.EntryService])
], HistoryComponent);
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map