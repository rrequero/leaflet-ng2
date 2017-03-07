"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var leaflet_1 = require("leaflet");
var consts_1 = require("./consts");
var IconDirective = (function (_super) {
    __extends(IconDirective, _super);
    function IconDirective() {
        var _this = _super.call(this, {
            iconUrl: consts_1.TRANSPARENT_PIXEL
        }) || this;
        _this.updateEvent = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(IconDirective.prototype, "iconUrl", {
        get: function () {
            return this.options.iconUrl;
        },
        set: function (val) {
            this.options.iconUrl = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "iconSize", {
        get: function () {
            return this.options.iconSize;
        },
        set: function (val) {
            this.options.iconSize = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "iconAnchor", {
        get: function () {
            return this.options.iconAnchor;
        },
        set: function (val) {
            this.options.iconAnchor = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "popupAnchor", {
        get: function () {
            return this.options.popupAnchor;
        },
        set: function (val) {
            this.options.popupAnchor = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowUrl", {
        get: function () {
            return this.options.shadowUrl;
        },
        set: function (val) {
            this.options.shadowUrl = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowSize", {
        get: function () {
            return this.options.shadowSize;
        },
        set: function (val) {
            this.options.shadowSize = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowAnchor", {
        get: function () {
            return this.options.shadowAnchor;
        },
        set: function (val) {
            this.options.shadowAnchor = val;
            this.updateEvent.emit({
                target: this,
                type: 'update'
            });
        },
        enumerable: true,
        configurable: true
    });
    return IconDirective;
}(leaflet_1.Icon));
__decorate([
    core_1.Output('update'),
    __metadata("design:type", core_1.EventEmitter)
], IconDirective.prototype, "updateEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], IconDirective.prototype, "iconUrl", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], IconDirective.prototype, "iconSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], IconDirective.prototype, "iconAnchor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], IconDirective.prototype, "popupAnchor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], IconDirective.prototype, "shadowUrl", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], IconDirective.prototype, "shadowSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], IconDirective.prototype, "shadowAnchor", null);
IconDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-icon'
    }),
    __metadata("design:paramtypes", [])
], IconDirective);
exports.IconDirective = IconDirective;
//# sourceMappingURL=icon.directive.js.map