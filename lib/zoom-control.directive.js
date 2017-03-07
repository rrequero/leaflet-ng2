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
var ZoomControlDirective = (function (_super) {
    __extends(ZoomControlDirective, _super);
    function ZoomControlDirective(mapComponent) {
        var _this = _super.call(this) || this;
        _this.displayChange = new core_1.EventEmitter();
        _this.positionChange = new core_1.EventEmitter();
        _this.addEvent = new core_1.EventEmitter();
        _this.removeEvent = new core_1.EventEmitter();
        _this.clickEvent = new core_1.EventEmitter();
        _this.dbclickEvent = new core_1.EventEmitter();
        _this.mousedownEvent = new core_1.EventEmitter();
        _this.mouseoverEvent = new core_1.EventEmitter();
        _this.mouseoutEvent = new core_1.EventEmitter();
        mapComponent.addControl(_this);
        var self = _this;
        var originalOnRemove = _this.onRemove;
        _this.onRemove = function (map) {
            originalOnRemove.call(this, map);
            self.displayChange.emit(false);
            self.removeEvent.emit({ type: 'remove', target: self });
            return self;
        };
        var originalOnAdd = _this.onAdd;
        _this.onAdd = function (map) {
            var tmp = originalOnAdd.call(this, map);
            self.displayChange.emit(true);
            self.addEvent.emit({ type: 'add', target: self });
            return tmp;
        };
        // Events
        _this.getContainer().addEventListener('click', function (event) {
            _this.clickEvent.emit(event);
        });
        _this.getContainer().addEventListener('dbclick', function (event) {
            _this.dbclickEvent.emit(event);
        });
        _this.getContainer().addEventListener('mousedown', function (event) {
            _this.mousedownEvent.emit(event);
        });
        _this.getContainer().addEventListener('mouseover', function (event) {
            _this.mouseoverEvent.emit(event);
        });
        _this.getContainer().addEventListener('mouseout', function (event) {
            _this.mouseoutEvent.emit(event);
        });
        return _this;
    }
    ZoomControlDirective.prototype.ngOnDestroy = function () {
        this._map.removeControl(this);
    };
    ZoomControlDirective.prototype.setPosition = function (val) {
        _super.prototype.setPosition.call(this, val);
        this.positionChange.emit(val);
        return this;
    };
    Object.defineProperty(ZoomControlDirective.prototype, "opacity", {
        get: function () {
            return parseFloat(this.getContainer().style.opacity);
        },
        set: function (val) {
            this.getContainer().style.opacity = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "display", {
        get: function () {
            return this._map && this.getContainer().style.display !== 'none';
        },
        set: function (val) {
            if (!this._map) {
                // No map available...
                return;
            }
            if (val) {
                this.getContainer().style.display = '';
                return;
            }
            this.getContainer().style.display = 'none';
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "position", {
        get: function () {
            return this.getPosition();
        },
        set: function (val) {
            this.setPosition(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomInText", {
        get: function () {
            return this.options.zoomInText;
        },
        set: function (val) {
            this.options.zoomInText = val;
            this._zoomInButton.textContent = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomInTitle", {
        get: function () {
            return this.options.zoomInTitle;
        },
        set: function (val) {
            this.options.zoomInTitle = val;
            this._zoomInButton.setAttribute('title', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomOutText", {
        get: function () {
            return this.options.zoomOutText;
        },
        set: function (val) {
            this.options.zoomOutText = val;
            this._zoomOutButton.textContent = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomOutTitle", {
        get: function () {
            return this.options.zoomOutTitle;
        },
        set: function (val) {
            this.options.zoomOutTitle = val;
            this._zoomOutButton.setAttribute('title', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zIndex", {
        get: function () {
            return parseInt(this.getContainer().style.zIndex);
        },
        set: function (zIndex) {
            if (!zIndex) {
                zIndex = 0;
            }
            this.getContainer().style.zIndex = zIndex.toString();
        },
        enumerable: true,
        configurable: true
    });
    return ZoomControlDirective;
}(leaflet_1.Control.Zoom));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "positionChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], ZoomControlDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ZoomControlDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ZoomControlDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ZoomControlDirective.prototype, "position", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ZoomControlDirective.prototype, "zoomInText", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ZoomControlDirective.prototype, "zoomInTitle", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ZoomControlDirective.prototype, "zoomOutText", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ZoomControlDirective.prototype, "zoomOutTitle", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ZoomControlDirective.prototype, "zIndex", null);
ZoomControlDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-zoom-control'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], ZoomControlDirective);
exports.ZoomControlDirective = ZoomControlDirective;
//# sourceMappingURL=zoom-control.directive.js.map