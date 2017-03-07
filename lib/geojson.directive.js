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
var marker_directive_1 = require("./marker.directive");
var map_component_1 = require("./map.component");
// Content-Child imports
var popup_directive_1 = require("./popup.directive");
var tooltip_directive_1 = require("./tooltip.directive");
var GeoJSONDirective = (function (_super) {
    __extends(GeoJSONDirective, _super);
    function GeoJSONDirective(mapComponent) {
        var _this = _super.call(this, { features: [], type: 'FeatureCollection' }, {
            filter: function (feature) {
                return _this.filterFeatures(feature);
            },
            onEachFeature: function (feature, layer) {
                _this.onEachFeatureEvent.emit({ feature: feature, layer: layer });
            },
            pointToLayer: function (geoJSON, latLng) {
                return _this.pointToLayer(geoJSON, latLng);
            },
            style: function (geoJSON) {
                return _this.styler(geoJSON, _this.defaultStyle);
            }
        }) || this;
        /* tslint:disable:max-line-length */
        _this.dataChange = new core_1.EventEmitter();
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
        /* tslint:disable:max-line-length */
        _this.onEachFeatureEvent = new core_1.EventEmitter();
        /* tslint:enable */
        _this.defaultStyle = {};
        _this.initialized = false;
        _this.mapComponent = mapComponent;
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
    GeoJSONDirective.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    };
    GeoJSONDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    GeoJSONDirective.prototype.pointToLayer = function (geoJSON, latLng) {
        var marker = new marker_directive_1.MarkerDirective(this.mapComponent);
        marker.setLatLng(latLng);
        return marker;
    };
    GeoJSONDirective.prototype.styler = function (geoJSON, defaultStyle) {
        return defaultStyle;
    };
    GeoJSONDirective.prototype.filterFeatures = function (geoJSON) {
        return true;
    };
    GeoJSONDirective.prototype.addData = function (data) {
        var returnValue = _super.prototype.addData.call(this, data);
        if (!this.initialized) {
            return returnValue;
        }
        this.dataChange.emit(this.toGeoJSON());
        return returnValue;
    };
    GeoJSONDirective.prototype.setData = function (val) {
        _super.prototype.clearLayers.call(this);
        _super.prototype.addData.call(this, val);
        this.dataChange.emit(this.toGeoJSON());
        return this;
    };
    Object.defineProperty(GeoJSONDirective.prototype, "data", {
        get: function () {
            return this.toGeoJSON();
        },
        set: function (val) {
            this.setData(val);
        },
        enumerable: true,
        configurable: true
    });
    return GeoJSONDirective;
}(leaflet_1.GeoJSON));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "dataChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Output('onEachFeature'),
    __metadata("design:type", core_1.EventEmitter)
], GeoJSONDirective.prototype, "onEachFeatureEvent", void 0);
__decorate([
    core_1.Optional(), core_1.ContentChild(popup_directive_1.PopupDirective),
    __metadata("design:type", popup_directive_1.PopupDirective)
], GeoJSONDirective.prototype, "popupDirective", void 0);
__decorate([
    core_1.Optional(), core_1.ContentChild(tooltip_directive_1.TooltipDirective),
    __metadata("design:type", tooltip_directive_1.TooltipDirective)
], GeoJSONDirective.prototype, "tooltipDirective", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], GeoJSONDirective.prototype, "data", null);
GeoJSONDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-geojson'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], GeoJSONDirective);
exports.GeoJSONDirective = GeoJSONDirective;
//# sourceMappingURL=geojson.directive.js.map