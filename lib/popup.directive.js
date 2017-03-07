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
var map_component_1 = require("./map.component");
var PopupDirective = (function (_super) {
    __extends(PopupDirective, _super);
    function PopupDirective(mapComponent, elementRef) {
        var _this = _super.call(this) || this;
        _this.contentChange = new core_1.EventEmitter();
        _this.openedChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.positionChange = new core_1.EventEmitter();
        _this.openEvent = new core_1.EventEmitter();
        _this.closeEvent = new core_1.EventEmitter();
        _this.map = mapComponent;
        _this.setContent(elementRef.nativeElement);
        _this.on('add', function (event) {
            _this.openEvent.emit(event);
            _this.openedChange.emit(true);
        });
        _this.on('remove', function (event) {
            _this.closeEvent.emit(event);
            _this.openedChange.emit(false);
        });
        return _this;
    }
    PopupDirective.prototype.ngOnDestroy = function () {
        if (this._source) {
            this._source.unbindPopup();
        }
    };
    PopupDirective.prototype.setContent = function (content) {
        this.contentChange.emit((content));
        return _super.prototype.setContent.call(this, content);
    };
    Object.defineProperty(PopupDirective.prototype, "content", {
        get: function () {
            return this.getContent();
        },
        set: function (val) {
            this.setContent(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "opened", {
        get: function () {
            return !!this._map;
        },
        set: function (val) {
            if (val) {
                this.openOn(this.map);
                return;
            }
            this._close();
        },
        enumerable: true,
        configurable: true
    });
    PopupDirective.prototype.setLatLng = function (latlng) {
        _super.prototype.setLatLng.call(this, latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(leaflet_1.latLng(this.lat, this.lng));
        return this;
    };
    Object.defineProperty(PopupDirective.prototype, "lat", {
        get: function () {
            return this.getLatLng().lat;
        },
        set: function (val) {
            this.setLatLng([val, this.lng]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "lng", {
        get: function () {
            return this.getLatLng().lng;
        },
        set: function (val) {
            this.setLatLng([this.lat, val]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "position", {
        get: function () {
            return this.getLatLng();
        },
        set: function (val) {
            this.setLatLng(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "maxWidth", {
        get: function () {
            return this.options.maxWidth;
        },
        set: function (val) {
            this.options.maxWidth = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "minWidth", {
        get: function () {
            return this.options.minWidth;
        },
        set: function (val) {
            this.options.minWidth = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "maxHeight", {
        get: function () {
            return this.options.maxHeight;
        },
        set: function (val) {
            this.options.maxHeight = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPan", {
        get: function () {
            return this.options.autoPan;
        },
        set: function (val) {
            this.options.autoPan = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPanPaddingTopLeft", {
        get: function () {
            return this.options.autoPanPaddingTopLeft;
        },
        set: function (val) {
            this.options.autoPanPaddingTopLeft = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPanPaddingBottomRight", {
        get: function () {
            return this.options.autoPanPaddingBottomRight;
        },
        set: function (val) {
            this.options.autoPanPaddingBottomRight = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPanPadding", {
        get: function () {
            return this.options.autoPanPadding;
        },
        set: function (val) {
            this.options.autoPanPadding = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "keepInView", {
        get: function () {
            return this.options.keepInView;
        },
        set: function (val) {
            this.options.keepInView = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "closeButton", {
        get: function () {
            return this.options.closeButton;
        },
        set: function (val) {
            this.options.closeButton = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoClose", {
        get: function () {
            return this.options.autoClose;
        },
        set: function (val) {
            this.options.autoClose = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        set: function (val) {
            this.options.className = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "pane", {
        get: function () {
            return this.options.pane;
        },
        set: function (val) {
            this.options.pane = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    return PopupDirective;
}(leaflet_1.Popup));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "contentChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "openedChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "latChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "lngChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "positionChange", void 0);
__decorate([
    core_1.Output('open'),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "openEvent", void 0);
__decorate([
    core_1.Output('close'),
    __metadata("design:type", core_1.EventEmitter)
], PopupDirective.prototype, "closeEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PopupDirective.prototype, "content", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PopupDirective.prototype, "opened", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PopupDirective.prototype, "lat", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PopupDirective.prototype, "lng", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.LatLng),
    __metadata("design:paramtypes", [leaflet_1.LatLng])
], PopupDirective.prototype, "position", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PopupDirective.prototype, "maxWidth", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PopupDirective.prototype, "minWidth", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PopupDirective.prototype, "maxHeight", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PopupDirective.prototype, "autoPan", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], PopupDirective.prototype, "autoPanPaddingTopLeft", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], PopupDirective.prototype, "autoPanPaddingBottomRight", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], PopupDirective.prototype, "autoPanPadding", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PopupDirective.prototype, "keepInView", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PopupDirective.prototype, "closeButton", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PopupDirective.prototype, "autoClose", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PopupDirective.prototype, "className", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PopupDirective.prototype, "pane", null);
PopupDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-popup'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __param(1, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [map_component_1.MapComponent,
        core_1.ElementRef])
], PopupDirective);
exports.PopupDirective = PopupDirective;
//# sourceMappingURL=popup.directive.js.map