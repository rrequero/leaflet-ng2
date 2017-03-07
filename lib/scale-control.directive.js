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
var ScaleControlDirective = (function (_super) {
    __extends(ScaleControlDirective, _super);
    function ScaleControlDirective(mapComponent) {
        var _this = _super.call(this) || this;
        _this.displayChange = new core_1.EventEmitter();
        _this.zIndexChange = new core_1.EventEmitter();
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
    ScaleControlDirective.prototype.ngOnDestroy = function () {
        this._map.removeControl(this);
    };
    ScaleControlDirective.prototype.setPosition = function (val) {
        _super.prototype.setPosition.call(this, val);
        this.positionChange.emit(val);
        return this;
    };
    Object.defineProperty(ScaleControlDirective.prototype, "opacity", {
        get: function () {
            return parseFloat(this.getContainer().style.opacity);
        },
        set: function (val) {
            this.getContainer().style.opacity = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "display", {
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
    Object.defineProperty(ScaleControlDirective.prototype, "position", {
        get: function () {
            return this.getPosition();
        },
        set: function (val) {
            this.setPosition(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "maxWidth", {
        get: function () {
            return this.options.maxWidth;
        },
        set: function (val) {
            this.options.maxWidth = val;
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "metric", {
        get: function () {
            return this.options.metric;
        },
        set: function (val) {
            while (this.getContainer().hasChildNodes()) {
                this.getContainer().removeChild(this.getContainer().lastChild);
            }
            this.options.metric = val;
            this._addScales(this.options, 'leaflet-control-scale-line', this.getContainer());
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "imperial", {
        get: function () {
            return this.options.imperial;
        },
        set: function (val) {
            while (this.getContainer().hasChildNodes()) {
                this.getContainer().removeChild(this.getContainer().lastChild);
            }
            this.options.imperial = val;
            this._addScales(this.options, 'leaflet-control-scale-line', this.getContainer());
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    return ScaleControlDirective;
}(leaflet_1.Control.Scale));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "zIndexChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "positionChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], ScaleControlDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ScaleControlDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ScaleControlDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ScaleControlDirective.prototype, "position", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ScaleControlDirective.prototype, "maxWidth", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ScaleControlDirective.prototype, "metric", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ScaleControlDirective.prototype, "imperial", null);
ScaleControlDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-scale-control'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], ScaleControlDirective);
exports.ScaleControlDirective = ScaleControlDirective;
//# sourceMappingURL=scale-control.directive.js.map