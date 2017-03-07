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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var leaflet_1 = require("leaflet");
var DivIconDirective = (function (_super) {
    __extends(DivIconDirective, _super);
    function DivIconDirective(elementRef) {
        var _this = _super.call(this, {}) || this;
        _this.updateEvent = new core_1.EventEmitter();
        _this.contentHtml = elementRef.nativeElement;
        return _this;
    }
    Object.defineProperty(DivIconDirective.prototype, "iconSize", {
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
    Object.defineProperty(DivIconDirective.prototype, "iconAnchor", {
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
    Object.defineProperty(DivIconDirective.prototype, "popupAnchor", {
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
    DivIconDirective.prototype.createIcon = function (oldDivIcon) {
        var clonedOptions = Object.create(this.options);
        clonedOptions.html = '';
        oldDivIcon = _super.prototype.createIcon.call({ options: clonedOptions }, oldDivIcon);
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    };
    return DivIconDirective;
}(leaflet_1.DivIcon));
__decorate([
    core_1.Output('update'),
    __metadata("design:type", core_1.EventEmitter)
], DivIconDirective.prototype, "updateEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], DivIconDirective.prototype, "iconSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], DivIconDirective.prototype, "iconAnchor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], DivIconDirective.prototype, "popupAnchor", null);
DivIconDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-icon'
    }),
    __param(0, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DivIconDirective);
exports.DivIconDirective = DivIconDirective;
//# sourceMappingURL=div-icon.directive.js.map