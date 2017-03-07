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
var consts_1 = require("./consts");
var AttributionControlDirective = (function (_super) {
    __extends(AttributionControlDirective, _super);
    function AttributionControlDirective(mapComponent) {
        var _this = _super.call(this, { prefix: consts_1.ATTRIBUTION_PREFIX }) || this;
        _this.displayChange = new core_1.EventEmitter();
        _this.zIndexChange = new core_1.EventEmitter();
        _this.positionChange = new core_1.EventEmitter();
        _this.prefixChange = new core_1.EventEmitter();
        _this.attributionsChange = new core_1.EventEmitter();
        _this.addEvent = new core_1.EventEmitter();
        _this.removeEvent = new core_1.EventEmitter();
        _this.clickEvent = new core_1.EventEmitter();
        _this.dbclickEvent = new core_1.EventEmitter();
        _this.mousedownEvent = new core_1.EventEmitter();
        _this.mouseoverEvent = new core_1.EventEmitter();
        _this.mouseoutEvent = new core_1.EventEmitter();
        mapComponent.addControl(_this);
        var self = _this;
        _this.onRemove = function () {
            self.displayChange.emit(false);
            self.removeEvent.emit({ target: self, type: 'remove' });
            return self;
        };
        _this.onAdd = function () {
            self.displayChange.emit(true);
            self.addEvent.emit({ target: self, type: 'add' });
            return self.getContainer();
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
    AttributionControlDirective.prototype.ngOnDestroy = function () {
        this._map.removeControl(this);
    };
    AttributionControlDirective.prototype.setPosition = function (val) {
        _super.prototype.setPosition.call(this, val);
        this.positionChange.emit(val);
        return this;
    };
    Object.defineProperty(AttributionControlDirective.prototype, "opacity", {
        get: function () {
            return parseFloat(this.getContainer().style.opacity);
        },
        set: function (val) {
            this.getContainer().style.opacity = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributionControlDirective.prototype, "display", {
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
    Object.defineProperty(AttributionControlDirective.prototype, "position", {
        get: function () {
            return this.getPosition();
        },
        set: function (val) {
            this.setPosition(val);
        },
        enumerable: true,
        configurable: true
    });
    AttributionControlDirective.prototype.setPrefix = function (prefix) {
        _super.prototype.setPrefix.call(this, prefix);
        this.prefixChange.emit(prefix);
        return this;
    };
    Object.defineProperty(AttributionControlDirective.prototype, "prefix", {
        get: function () {
            return this.options.prefix;
        },
        set: function (val) {
            this.setPrefix(val);
        },
        enumerable: true,
        configurable: true
    });
    AttributionControlDirective.prototype.addAttribution = function (val) {
        _super.prototype.addAttribution.call(this, val);
        this.attributionsChange.emit(this.attributions);
        return this;
    };
    AttributionControlDirective.prototype.removeAttribution = function (val) {
        _super.prototype.removeAttribution.call(this, val);
        this.attributionsChange.emit(this.attributions);
        return this;
    };
    Object.defineProperty(AttributionControlDirective.prototype, "attributions", {
        get: function () {
            var keys = Object.keys(this._attributions);
            var arr = [];
            for (var i = 0; i < keys.length; i += 1) {
                if (this._attributions[keys[i]] === 1) {
                    arr.push(keys[i]);
                }
            }
            return arr;
        },
        set: function (val) {
            this.removeAllAttributions(true);
            for (var i = 0; i < val.length; i += 1) {
                _super.prototype.addAttribution.call(this, val[i]);
            }
            this.attributionsChange.emit(this.attributions);
        },
        enumerable: true,
        configurable: true
    });
    AttributionControlDirective.prototype.removeAllAttributions = function (silent) {
        var keys = Object.keys(this._attributions);
        for (var i = 0; i < keys.length; i += 1) {
            _super.prototype.removeAttribution.call(this, keys[i]);
        }
        if (silent) {
            return this;
        }
        this.attributionsChange.emit([]);
        return this;
    };
    return AttributionControlDirective;
}(leaflet_1.Control.Attribution));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "zIndexChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "positionChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "prefixChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "attributionsChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], AttributionControlDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], AttributionControlDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], AttributionControlDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AttributionControlDirective.prototype, "position", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AttributionControlDirective.prototype, "prefix", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], AttributionControlDirective.prototype, "attributions", null);
AttributionControlDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-attribution-control'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], AttributionControlDirective);
exports.AttributionControlDirective = AttributionControlDirective;
//# sourceMappingURL=attribution-control.directive.js.map