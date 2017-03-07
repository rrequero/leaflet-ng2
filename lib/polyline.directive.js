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
var lng2lat_1 = require("./lng2lat");
// Content-Child imports
var popup_directive_1 = require("./popup.directive");
var tooltip_directive_1 = require("./tooltip.directive");
var PolylineDirective = (function (_super) {
    __extends(PolylineDirective, _super);
    function PolylineDirective(mapComponent) {
        var _this = _super.call(this, []) || this;
        _this.displayChange = new core_1.EventEmitter();
        _this.strokeChange = new core_1.EventEmitter();
        _this.colorChange = new core_1.EventEmitter();
        _this.weightChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        _this.lineCapChange = new core_1.EventEmitter();
        _this.lineJoinChange = new core_1.EventEmitter();
        _this.dashArrayChange = new core_1.EventEmitter();
        _this.dashOffsetChange = new core_1.EventEmitter();
        _this.fillChange = new core_1.EventEmitter();
        _this.fillColorChange = new core_1.EventEmitter();
        _this.fillOpacityChange = new core_1.EventEmitter();
        _this.fillRuleChange = new core_1.EventEmitter();
        // @Output() public rendererChange: EventEmitter<number> = new EventEmitter();
        _this.classNameChange = new core_1.EventEmitter();
        _this.styleChange = new core_1.EventEmitter();
        _this.latLngsChange = new core_1.EventEmitter();
        /* tslint:disable:max-line-length */
        _this.geoJSONChange = new core_1.EventEmitter();
        /* tslint:enable */
        _this.addEvent = new core_1.EventEmitter();
        _this.removeEvent = new core_1.EventEmitter();
        _this.popupopenEvent = new core_1.EventEmitter();
        _this.popupcloseEvent = new core_1.EventEmitter();
        _this.tooltipopenEvent = new core_1.EventEmitter();
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        _this.clickEvent = new core_1.EventEmitter();
        _this.dbclickEvent = new core_1.EventEmitter();
        _this.mousedownEvent = new core_1.EventEmitter();
        _this.mouseoverEvent = new core_1.EventEmitter();
        _this.mouseoutEvent = new core_1.EventEmitter();
        _this.contextmenuEvent = new core_1.EventEmitter();
        _this.feature = _this.feature || { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [] } };
        _this.feature.properties = _this.feature.properties || {};
        _this.on('remove', function () {
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        mapComponent.addLayer(_this);
        // Events
        _this.on('add', function (event) {
            _this.addEvent.emit(event);
        });
        _this.on('remove', function (event) {
            _this.removeEvent.emit(event);
        });
        _this.on('popupopen', function (event) {
            _this.popupopenEvent.emit(event);
        });
        _this.on('popupclose', function (event) {
            _this.popupcloseEvent.emit(event);
        });
        _this.on('tooltipopen', function (event) {
            _this.tooltipopenEvent.emit(event);
        });
        _this.on('tooltipclose', function (event) {
            _this.tooltipcloseEvent.emit(event);
        });
        _this.on('click', function (event) {
            _this.clickEvent.emit(event);
        });
        _this.on('dbclick', function (event) {
            _this.dbclickEvent.emit(event);
        });
        _this.on('mousedown', function (event) {
            _this.mousedownEvent.emit(event);
        });
        _this.on('mouseover', function (event) {
            _this.mouseoverEvent.emit(event);
        });
        _this.on('mouseout', function (event) {
            _this.mouseoutEvent.emit(event);
        });
        _this.on('contextmenu', function (event) {
            _this.contextmenuEvent.emit(event);
        });
        return _this;
    }
    PolylineDirective.prototype.ngAfterViewInit = function () {
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    };
    PolylineDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    PolylineDirective.prototype.setLatLngs = function (val) {
        _super.prototype.setLatLngs.call(this, val);
        this.latLngsChange.emit(this._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    };
    PolylineDirective.prototype.addLatLng = function (val) {
        _super.prototype.addLatLng.call(this, val);
        this.latLngsChange.emit(this._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    };
    Object.defineProperty(PolylineDirective.prototype, "latLngs", {
        get: function () {
            return this._latlngs;
        },
        set: function (val) {
            this.setLatLngs(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "geoJSON", {
        get: function () {
            return this.toGeoJSON();
        },
        set: function (val) {
            this.feature.properties = val.properties;
            var geomType = val.geometry.type; // Normally '(Multi)LineString'
            /* istanbul ignore if */
            if (geomType !== 'LineString' && geomType !== 'MultiLineString') {
                throw new Error('Unsupported geometry type: ' + geomType);
            }
            this.setLatLngs(lng2lat_1.lng2lat(val.geometry.coordinates));
        },
        enumerable: true,
        configurable: true
    });
    PolylineDirective.prototype.setStyle = function (style) {
        _super.prototype.setStyle.call(this, style);
        if (style.hasOwnProperty('stroke')) {
            this.strokeChange.emit(style.stroke);
        }
        if (style.hasOwnProperty('color')) {
            this.colorChange.emit(style.color);
        }
        if (style.hasOwnProperty('weight')) {
            this.weightChange.emit(style.weight);
        }
        if (style.hasOwnProperty('opacity')) {
            this.opacityChange.emit(style.opacity);
        }
        if (style.hasOwnProperty('lineCap')) {
            this.lineCapChange.emit(style.lineCap);
        }
        if (style.hasOwnProperty('lineJoin')) {
            this.lineJoinChange.emit(style.lineJoin);
        }
        if (style.hasOwnProperty('dashArray')) {
            this.dashArrayChange.emit(style.dashArray);
        }
        if (style.hasOwnProperty('dashOffset')) {
            this.dashOffsetChange.emit(style.dashOffset);
        }
        if (style.hasOwnProperty('fill')) {
            this.fillChange.emit(style.fill);
        }
        if (style.hasOwnProperty('fillColor')) {
            this.fillColorChange.emit(style.fillColor);
        }
        if (style.hasOwnProperty('fillOpacity')) {
            this.fillOpacityChange.emit(style.fillOpacity);
        }
        if (style.hasOwnProperty('fillRule')) {
            this.fillRuleChange.emit(style.fillRule);
        }
        if (style.hasOwnProperty('className')) {
            this.classNameChange.emit(style.className);
        }
        this.styleChange.emit(style);
        return this;
    };
    Object.defineProperty(PolylineDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setStyle({ opacity: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "stroke", {
        get: function () {
            return this.options.stroke;
        },
        set: function (val) {
            this.setStyle({ stroke: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "color", {
        get: function () {
            return this.options.color;
        },
        set: function (val) {
            this.setStyle({ color: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "weight", {
        get: function () {
            return this.options.weight;
        },
        set: function (val) {
            this.setStyle({ weight: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "lineCap", {
        get: function () {
            return this.options.lineCap;
        },
        set: function (val) {
            this.setStyle({ lineCap: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "lineJoin", {
        get: function () {
            return this.options.lineJoin;
        },
        set: function (val) {
            this.setStyle({ lineJoin: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "dashArray", {
        get: function () {
            return this.options.dashArray;
        },
        set: function (val) {
            this.setStyle({ dashArray: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "dashOffset", {
        get: function () {
            return this.options.dashOffset;
        },
        set: function (val) {
            this.setStyle({ dashOffset: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "fill", {
        get: function () {
            return this.options.fill;
        },
        set: function (val) {
            this.setStyle({ fill: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "fillColor", {
        get: function () {
            return this.options.fillColor;
        },
        set: function (val) {
            this.setStyle({ fillColor: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "fillOpacity", {
        get: function () {
            return this.options.fillOpacity;
        },
        set: function (val) {
            this.setStyle({ fillOpacity: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "fillRule", {
        get: function () {
            return this.options.fillRule;
        },
        set: function (val) {
            this.setStyle({ fillRule: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        set: function (val) {
            this.setStyle({ className: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "style", {
        get: function () {
            return this.options;
        },
        set: function (val) {
            this.setStyle(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "display", {
        get: function () {
            var container;
            try {
                container = this.getElement();
            }
            catch (err) {
                /* istanbul ignore next */
                return false;
            }
            return container.style.display !== 'none' && !!container.parentElement;
        },
        set: function (val) {
            var isDisplayed = this.display;
            if (isDisplayed === val) {
                return;
            }
            var container;
            try {
                container = this.getElement();
            }
            catch (err) {
                /* istanbul ignore next */
                return;
            }
            this.displayChange.emit(val);
            container.style.display = val ? '' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "interactive", {
        get: function () {
            return this.options.interactive;
        },
        set: function (val) {
            var map = this._map;
            this.options.interactive = val;
            this.onRemove(map);
            this.onAdd(map);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "smoothFactor", {
        get: function () {
            return this.options.smoothFactor;
        },
        set: function (val) {
            this.options.smoothFactor = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "noClip", {
        get: function () {
            return this.options.noClip;
        },
        set: function (val) {
            this.options.noClip = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolylineDirective.prototype, "properties", {
        get: function () {
            return this.feature.properties;
        },
        set: function (val) {
            this.feature.properties = val;
            this.geoJSONChange.emit(this.geoJSON);
        },
        enumerable: true,
        configurable: true
    });
    return PolylineDirective;
}(leaflet_1.Polyline));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "strokeChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "colorChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "weightChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "lineCapChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "lineJoinChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "dashArrayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "dashOffsetChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "fillChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "fillColorChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "fillOpacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "fillRuleChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "classNameChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "styleChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "latLngsChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "geoJSONChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], PolylineDirective.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Optional(), core_1.ContentChild(popup_directive_1.PopupDirective),
    __metadata("design:type", popup_directive_1.PopupDirective)
], PolylineDirective.prototype, "popupDirective", void 0);
__decorate([
    core_1.Optional(), core_1.ContentChild(tooltip_directive_1.TooltipDirective),
    __metadata("design:type", tooltip_directive_1.TooltipDirective)
], PolylineDirective.prototype, "tooltipDirective", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], PolylineDirective.prototype, "latLngs", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PolylineDirective.prototype, "geoJSON", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PolylineDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PolylineDirective.prototype, "stroke", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "color", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PolylineDirective.prototype, "weight", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "lineCap", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "lineJoin", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "dashArray", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "dashOffset", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PolylineDirective.prototype, "fill", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "fillColor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PolylineDirective.prototype, "fillOpacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "fillRule", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PolylineDirective.prototype, "className", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PolylineDirective.prototype, "style", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PolylineDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PolylineDirective.prototype, "interactive", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PolylineDirective.prototype, "smoothFactor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PolylineDirective.prototype, "noClip", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PolylineDirective.prototype, "properties", null);
PolylineDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-polyline'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], PolylineDirective);
exports.PolylineDirective = PolylineDirective;
//# sourceMappingURL=polyline.directive.js.map