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
var TooltipDirective = (function (_super) {
    __extends(TooltipDirective, _super);
    function TooltipDirective(mapComponent, elementRef) {
        var _this = _super.call(this) || this;
        _this.contentChange = new core_1.EventEmitter();
        _this.openedChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.positionChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
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
    TooltipDirective.prototype.ngOnDestroy = function () {
        if (this._source) {
            this._source.unbindTooltip();
        }
    };
    TooltipDirective.prototype.setContent = function (content) {
        this.contentChange.emit((content));
        return _super.prototype.setContent.call(this, content);
    };
    Object.defineProperty(TooltipDirective.prototype, "content", {
        get: function () {
            return this.getContent();
        },
        set: function (val) {
            this.setContent(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "opened", {
        get: function () {
            return !!this._map;
        },
        set: function (val) {
            if (val) {
                this.map.openTooltip(this);
                return;
            }
            this._close();
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.setLatLng = function (latlng) {
        _super.prototype.setLatLng.call(this, latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(leaflet_1.latLng(this.lat, this.lng));
        return this;
    };
    Object.defineProperty(TooltipDirective.prototype, "lat", {
        get: function () {
            return this.getLatLng().lat;
        },
        set: function (val) {
            this.setLatLng([val, this.lng]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "lng", {
        get: function () {
            return this.getLatLng().lng;
        },
        set: function (val) {
            this.setLatLng([this.lat, val]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "position", {
        get: function () {
            return this.getLatLng();
        },
        set: function (val) {
            this.setLatLng(val);
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.setOpacity = function (val) {
        _super.prototype.setOpacity.call(this, val);
        this.opacityChange.emit(val);
    };
    Object.defineProperty(TooltipDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "className", {
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
    Object.defineProperty(TooltipDirective.prototype, "pane", {
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
    Object.defineProperty(TooltipDirective.prototype, "interactive", {
        get: function () {
            return this.options.interactive;
        },
        set: function (val) {
            this.options.interactive = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "sticky", {
        get: function () {
            return this.options.sticky;
        },
        set: function (val) {
            this.options.sticky = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "direction", {
        get: function () {
            return this.options.direction;
        },
        set: function (val) {
            this.options.direction = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "permanent", {
        get: function () {
            return this.options.permanent;
        },
        set: function (val) {
            this.options.permanent = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "offset", {
        get: function () {
            return this.options.offset;
        },
        set: function (val) {
            this.options.offset = val;
        },
        enumerable: true,
        configurable: true
    });
    return TooltipDirective;
}(leaflet_1.Tooltip));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "contentChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "openedChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "latChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "lngChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "positionChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output('open'),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "openEvent", void 0);
__decorate([
    core_1.Output('close'),
    __metadata("design:type", core_1.EventEmitter)
], TooltipDirective.prototype, "closeEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TooltipDirective.prototype, "content", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TooltipDirective.prototype, "opened", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TooltipDirective.prototype, "lat", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TooltipDirective.prototype, "lng", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.LatLng),
    __metadata("design:paramtypes", [leaflet_1.LatLng])
], TooltipDirective.prototype, "position", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TooltipDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TooltipDirective.prototype, "className", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TooltipDirective.prototype, "pane", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TooltipDirective.prototype, "interactive", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TooltipDirective.prototype, "sticky", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TooltipDirective.prototype, "direction", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TooltipDirective.prototype, "permanent", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], TooltipDirective.prototype, "offset", null);
TooltipDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-tooltip'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __param(1, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [map_component_1.MapComponent,
        core_1.ElementRef])
], TooltipDirective);
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map