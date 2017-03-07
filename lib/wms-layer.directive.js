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
var WmsLayerDirective = (function (_super) {
    __extends(WmsLayerDirective, _super);
    function WmsLayerDirective(mapComponent) {
        var _this = 
        // Transparent 1px image:
        _super.call(this, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkY' +
            'AAAAAYAAjCB0C8AAAAASUVORK5CYII=', { layers: '' }) || this;
        _this.urlChange = new core_1.EventEmitter();
        _this.displayChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        _this.zIndexChange = new core_1.EventEmitter();
        _this.layersChange = new core_1.EventEmitter();
        _this.stylesChange = new core_1.EventEmitter();
        _this.formatChange = new core_1.EventEmitter();
        _this.versionChange = new core_1.EventEmitter();
        _this.transparentChange = new core_1.EventEmitter();
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
        _this.loadingEvent = new core_1.EventEmitter();
        _this.tileunloadEvent = new core_1.EventEmitter();
        _this.tileloadstartEvent = new core_1.EventEmitter();
        _this.tileerrorEvent = new core_1.EventEmitter();
        _this.tileloadEvent = new core_1.EventEmitter();
        _this.loadEvent = new core_1.EventEmitter();
        _this.on('remove', function () {
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        _this.addTo(mapComponent);
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
        _this.on('loading', function (event) {
            _this.loadingEvent.emit(event);
        });
        _this.on('tileunload', function (event) {
            _this.tileunloadEvent.emit(event);
        });
        _this.on('tileloadstart', function (event) {
            _this.tileloadstartEvent.emit(event);
        });
        _this.on('tileerror', function (event) {
            _this.tileerrorEvent.emit(event);
        });
        _this.on('tileload', function (event) {
            _this.tileloadEvent.emit(event);
        });
        _this.on('load', function (event) {
            _this.loadEvent.emit(event);
        });
        return _this;
    }
    WmsLayerDirective.prototype.ngOnDestroy = function () {
        console.log('Destroy');
        this.removeFrom(this._map);
    };
    WmsLayerDirective.prototype.setUrl = function (url, noRedraw) {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return _super.prototype.setUrl.call(this, url, noRedraw);
    };
    Object.defineProperty(WmsLayerDirective.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            this.setUrl(val);
        },
        enumerable: true,
        configurable: true
    });
    WmsLayerDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(WmsLayerDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "display", {
        get: function () {
            var pane, container;
            try {
                pane = this.getPane();
                container = this.getContainer();
            }
            catch (err) {
                /* istanbul ignore next */
                return false;
            }
            for (var i = 0; i < pane.children.length; i += 1) {
                /* istanbul ignore else */
                if (pane.children[i] === container) {
                    return true;
                }
            }
            return false;
        },
        set: function (val) {
            var isDisplayed = this.display;
            if (isDisplayed === val) {
                return;
            }
            var pane, container, map, events, // Dictionary of functions
            eventKeys;
            try {
                pane = this.getPane();
                container = this.getContainer();
                map = this._map;
                events = this.getEvents();
                eventKeys = Object.keys(events);
            }
            catch (err) {
                /* istanbul ignore next */
                return;
            }
            if (val) {
                // show layer
                pane.appendChild(container);
                for (var i = 0; i < eventKeys.length; i += 1) {
                    map.on(eventKeys[i], events[eventKeys[i]], this);
                }
                this.redraw();
            }
            else {
                // hide layer
                pane.removeChild(container);
                for (var i = 0; i < eventKeys.length; i += 1) {
                    map.off(eventKeys[i], events[eventKeys[i]], this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    WmsLayerDirective.prototype.setZIndex = function (val) {
        _super.prototype.setZIndex.call(this, val);
        this.zIndexChange.emit(val);
        return this;
    };
    Object.defineProperty(WmsLayerDirective.prototype, "zIndex", {
        get: function () {
            return this.options.zIndex;
        },
        set: function (val) {
            this.setZIndex(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "tileSize", {
        get: function () {
            return this.options.tileSize;
        },
        set: function (val) {
            this.options.tileSize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "updateWhenIdle", {
        get: function () {
            return this.options.updateWhenIdle;
        },
        set: function (val) {
            this.options.updateWhenIdle = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "updateWhenZooming", {
        get: function () {
            return this.options.updateWhenZooming;
        },
        set: function (val) {
            this.options.updateWhenZooming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "updateInterval", {
        get: function () {
            return this.options.updateInterval;
        },
        set: function (val) {
            this.options.updateInterval = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "bounds", {
        get: function () {
            return this.options.bounds;
        },
        set: function (val) {
            this.options.bounds = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "noWrap", {
        get: function () {
            return this.options.noWrap;
        },
        set: function (val) {
            this.options.noWrap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        set: function (val) {
            this.options.className = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "keepBuffer", {
        get: function () {
            return this.options.keepBuffer;
        },
        set: function (val) {
            this.options.keepBuffer = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WmsLayerDirective.prototype, "maxNativeZoom", {
        get: function () {
            return this.options.maxNativeZoom;
        },
        set: function (val) {
            this.options.maxNativeZoom = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "minNativeZoom", {
        get: function () {
            return this.options.minNativeZoom;
        },
        set: function (val) {
            this.options.minNativeZoom = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "subdomains", {
        get: function () {
            if (typeof this.options.subdomains === 'string') {
                this.options.subdomains = this.options.subdomains.split('');
            }
            return this.options.subdomains;
        },
        set: function (val) {
            this.options.subdomains = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "errorTileUrl", {
        get: function () {
            return this.options.errorTileUrl;
        },
        set: function (val) {
            this.options.errorTileUrl = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "zoomOffset", {
        get: function () {
            return this.options.zoomOffset;
        },
        set: function (val) {
            this.options.zoomOffset = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "tms", {
        get: function () {
            return this.options.tms;
        },
        set: function (val) {
            this.options.tms = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "zoomReverse", {
        get: function () {
            return this.options.zoomReverse;
        },
        set: function (val) {
            this.options.zoomReverse = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "detectRetina", {
        get: function () {
            return this.options.detectRetina;
        },
        set: function (val) {
            this.options.detectRetina = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "crossOrigin", {
        get: function () {
            return this.options.crossOrigin;
        },
        set: function (val) {
            this.options.crossOrigin = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "uppercase", {
        get: function () {
            return this.options.uppercase;
        },
        set: function (val) {
            this.options.uppercase = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    // WMS Params
    WmsLayerDirective.prototype.setParams = function (params, redraw) {
        _super.prototype.setParams.call(this, params, redraw);
        this.layersChange.emit(this.wmsParams.layers.split(','));
        this.stylesChange.emit(this.wmsParams.styles.split(','));
        this.formatChange.emit(this.wmsParams.format);
        this.versionChange.emit(this.wmsParams.version);
        this.transparentChange.emit(this.wmsParams.transparent);
        return this;
    };
    Object.defineProperty(WmsLayerDirective.prototype, "layers", {
        get: function () {
            return this.wmsParams.layers.split(',');
        },
        set: function (val) {
            var newParams = Object.create(this.wmsParams);
            newParams.layers = val.join(',');
            this.setParams(newParams);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "styles", {
        get: function () {
            return this.wmsParams.styles.split(',');
        },
        set: function (val) {
            var newParams = Object.create(this.wmsParams);
            newParams.styles = val.join(',');
            this.setParams(newParams);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "format", {
        get: function () {
            return this.wmsParams.format;
        },
        set: function (val) {
            var newParams = Object.create(this.wmsParams);
            newParams.format = val;
            this.setParams(newParams);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "version", {
        get: function () {
            return this.wmsParams.version;
        },
        set: function (val) {
            var newParams = Object.create(this.wmsParams);
            newParams.version = val;
            this.setParams(newParams);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "transparent", {
        get: function () {
            return this.wmsParams.transparent;
        },
        set: function (val) {
            var newParams = Object.create(this.wmsParams);
            newParams.transparent = val;
            this.setParams(newParams);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WmsLayerDirective.prototype, "attribution", {
        get: function () {
            return this.getAttribution();
        },
        /**
         * Input for the attribution.
         * Use it with `<yaga-wms-layer [attribution]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#wmslayer-attribution Original Leaflet documentation
         */
        set: function (val) {
            if (this._map && this._map.attributionControl) {
                this._map.attributionControl.removeAttribution(this.getAttribution());
                this._map.attributionControl.addAttribution(val);
            }
            this.options.attribution = val;
        },
        enumerable: true,
        configurable: true
    });
    return WmsLayerDirective;
}(leaflet_1.TileLayer.WMS));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "urlChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "zIndexChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "layersChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "stylesChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "formatChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "versionChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "transparentChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Output('loading'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "loadingEvent", void 0);
__decorate([
    core_1.Output('tileunload'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "tileunloadEvent", void 0);
__decorate([
    core_1.Output('tileloadstart'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "tileloadstartEvent", void 0);
__decorate([
    core_1.Output('tileerror'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "tileerrorEvent", void 0);
__decorate([
    core_1.Output('tileload'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "tileloadEvent", void 0);
__decorate([
    core_1.Output('load'),
    __metadata("design:type", core_1.EventEmitter)
], WmsLayerDirective.prototype, "loadEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WmsLayerDirective.prototype, "url", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "zIndex", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], WmsLayerDirective.prototype, "tileSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "updateWhenIdle", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "updateWhenZooming", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "updateInterval", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WmsLayerDirective.prototype, "bounds", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "noWrap", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WmsLayerDirective.prototype, "className", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "keepBuffer", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "maxNativeZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "minNativeZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], WmsLayerDirective.prototype, "subdomains", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WmsLayerDirective.prototype, "errorTileUrl", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WmsLayerDirective.prototype, "zoomOffset", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "tms", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "zoomReverse", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "detectRetina", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "crossOrigin", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "uppercase", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], WmsLayerDirective.prototype, "layers", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], WmsLayerDirective.prototype, "styles", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WmsLayerDirective.prototype, "format", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WmsLayerDirective.prototype, "version", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WmsLayerDirective.prototype, "transparent", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WmsLayerDirective.prototype, "attribution", null);
WmsLayerDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-wms-layer'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], WmsLayerDirective);
exports.WmsLayerDirective = WmsLayerDirective;
//# sourceMappingURL=wms-layer.directive.js.map