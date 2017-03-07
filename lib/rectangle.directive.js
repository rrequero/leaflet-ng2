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
var RectangleDirective = (function (_super) {
    __extends(RectangleDirective, _super);
    function RectangleDirective(mapComponent) {
        var _this = _super.call(this, leaflet_1.latLngBounds([0, 0], [0, 0])) || this;
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
        _this.boundsChange = new core_1.EventEmitter();
        _this.northChange = new core_1.EventEmitter();
        _this.eastChange = new core_1.EventEmitter();
        _this.southChange = new core_1.EventEmitter();
        _this.westChange = new core_1.EventEmitter();
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
        _this.initialized = false;
        _this.feature = _this.feature || { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [] } };
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
    RectangleDirective.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    };
    RectangleDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    RectangleDirective.prototype.setBounds = function (val) {
        _super.prototype.setBounds.call(this, val);
        if (!this.initialized) {
            return this;
        }
        this.boundsChange.emit(this.getBounds());
        this.northChange.emit(this.getBounds().getNorth());
        this.eastChange.emit(this.getBounds().getEast());
        this.southChange.emit(this.getBounds().getSouth());
        this.westChange.emit(this.getBounds().getWest());
        return this;
    };
    Object.defineProperty(RectangleDirective.prototype, "bounds", {
        get: function () {
            return this.getBounds();
        },
        set: function (val) {
            this.setBounds(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "north", {
        get: function () {
            return this.getBounds().getNorth();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            // super because we call the change listeners ourselves
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [oldBounds.getSouth(), oldBounds.getWest()],
                [val, oldBounds.getEast()]
            ]));
            this.boundsChange.emit(this.bounds);
            this.northChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "east", {
        get: function () {
            return this.getBounds().getEast();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [oldBounds.getSouth(), oldBounds.getWest()],
                [oldBounds.getNorth(), val]
            ]));
            this.boundsChange.emit(this.bounds);
            this.eastChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "south", {
        get: function () {
            return this.getBounds().getSouth();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [val, oldBounds.getWest()],
                [oldBounds.getNorth(), oldBounds.getEast()]
            ]));
            this.boundsChange.emit(this.bounds);
            this.southChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "west", {
        get: function () {
            return this.getBounds().getWest();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [oldBounds.getSouth(), val],
                [oldBounds.getNorth(), oldBounds.getEast()]
            ]));
            this.boundsChange.emit(this.bounds);
            this.westChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    RectangleDirective.prototype.setLatLngs = function (val) {
        _super.prototype.setLatLngs.call(this, val);
        this.latLngsChange.emit(this._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    };
    RectangleDirective.prototype.addLatLng = function (val) {
        _super.prototype.addLatLng.call(this, val);
        this.latLngsChange.emit(this._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    };
    Object.defineProperty(RectangleDirective.prototype, "latLngs", {
        get: function () {
            return this._latlngs;
        },
        set: function (val) {
            this.setLatLngs(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "geoJSON", {
        get: function () {
            return this.toGeoJSON();
        },
        set: function (val) {
            this.feature.properties = val.properties;
            var geomType = val.geometry.type; // Normally '(Multi)Polygon'
            /* istanbul ignore if */
            if (geomType !== 'Polygon' && geomType !== 'MultiPolygon') {
                throw new Error('Unsupported geometry type: ' + geomType);
            }
            this.setLatLngs(lng2lat_1.lng2lat(val.geometry.coordinates));
        },
        enumerable: true,
        configurable: true
    });
    RectangleDirective.prototype.setStyle = function (style) {
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
    Object.defineProperty(RectangleDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setStyle({ opacity: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "stroke", {
        get: function () {
            return this.options.stroke;
        },
        set: function (val) {
            this.setStyle({ stroke: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "color", {
        get: function () {
            return this.options.color;
        },
        set: function (val) {
            this.setStyle({ color: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "weight", {
        get: function () {
            return this.options.weight;
        },
        set: function (val) {
            this.setStyle({ weight: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "lineCap", {
        get: function () {
            return this.options.lineCap;
        },
        set: function (val) {
            this.setStyle({ lineCap: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "lineJoin", {
        get: function () {
            return this.options.lineJoin;
        },
        set: function (val) {
            this.setStyle({ lineJoin: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "dashArray", {
        get: function () {
            return this.options.dashArray;
        },
        set: function (val) {
            this.setStyle({ dashArray: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "dashOffset", {
        get: function () {
            return this.options.dashOffset;
        },
        set: function (val) {
            this.setStyle({ dashOffset: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fill", {
        get: function () {
            return this.options.fill;
        },
        set: function (val) {
            this.setStyle({ fill: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fillColor", {
        get: function () {
            return this.options.fillColor;
        },
        set: function (val) {
            this.setStyle({ fillColor: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fillOpacity", {
        get: function () {
            return this.options.fillOpacity;
        },
        set: function (val) {
            this.setStyle({ fillOpacity: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fillRule", {
        get: function () {
            return this.options.fillRule;
        },
        set: function (val) {
            this.setStyle({ fillRule: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        set: function (val) {
            this.setStyle({ className: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "style", {
        get: function () {
            return this.options;
        },
        set: function (val) {
            this.setStyle(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "display", {
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
    Object.defineProperty(RectangleDirective.prototype, "interactive", {
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
    Object.defineProperty(RectangleDirective.prototype, "smoothFactor", {
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
    Object.defineProperty(RectangleDirective.prototype, "noClip", {
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
    Object.defineProperty(RectangleDirective.prototype, "properties", {
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
    return RectangleDirective;
}(leaflet_1.Rectangle));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "strokeChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "colorChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "weightChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "lineCapChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "lineJoinChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "dashArrayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "dashOffsetChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "fillChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "fillColorChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "fillOpacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "fillRuleChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "classNameChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "styleChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "latLngsChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "boundsChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "northChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "eastChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "southChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "westChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "geoJSONChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], RectangleDirective.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Optional(), core_1.ContentChild(popup_directive_1.PopupDirective),
    __metadata("design:type", popup_directive_1.PopupDirective)
], RectangleDirective.prototype, "popupDirective", void 0);
__decorate([
    core_1.Optional(), core_1.ContentChild(tooltip_directive_1.TooltipDirective),
    __metadata("design:type", tooltip_directive_1.TooltipDirective)
], RectangleDirective.prototype, "tooltipDirective", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.LatLngBounds),
    __metadata("design:paramtypes", [leaflet_1.LatLngBounds])
], RectangleDirective.prototype, "bounds", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "north", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "east", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "south", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "west", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], RectangleDirective.prototype, "latLngs", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RectangleDirective.prototype, "geoJSON", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], RectangleDirective.prototype, "stroke", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "color", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "weight", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "lineCap", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "lineJoin", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "dashArray", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "dashOffset", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], RectangleDirective.prototype, "fill", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "fillColor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "fillOpacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "fillRule", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], RectangleDirective.prototype, "className", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RectangleDirective.prototype, "style", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], RectangleDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], RectangleDirective.prototype, "interactive", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], RectangleDirective.prototype, "smoothFactor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], RectangleDirective.prototype, "noClip", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RectangleDirective.prototype, "properties", null);
RectangleDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-rectangle'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], RectangleDirective);
exports.RectangleDirective = RectangleDirective;
//# sourceMappingURL=rectangle.directive.js.map