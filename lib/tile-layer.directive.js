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
/**
 * Directive for Tile-Layers
 * @link http://leafletjs.com/reference-1.0.2.html#tilelayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
var TileLayerDirective = (function (_super) {
    __extends(TileLayerDirective, _super);
    function TileLayerDirective(mapComponent) {
        var _this = 
        // Transparent 1px image:
        _super.call(this, consts_1.TRANSPARENT_PIXEL) || this;
        /**
         * Two-Way binded property for the URL.
         * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer (urlChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-seturl Original Leaflet documentation
         */
        _this.urlChange = new core_1.EventEmitter();
        /**
         * Two-Way binded property for the display status of the layer.
         * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer (displayChange)="processEvent($event)">`
         */
        _this.displayChange = new core_1.EventEmitter();
        /**
         * Two-Way binded property for the opacity of the layer.
         * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer (opacityChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-opacity Original Leaflet documentation
         */
        _this.opacityChange = new core_1.EventEmitter();
        /**
         * Two-Way binded property for the zIndex of the layer.
         * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setzindex Original Leaflet documentation
         */
        _this.zIndexChange = new core_1.EventEmitter();
        /**
         * Form leaflet fired add event.
         * Use it with `<yaga-tile-layer (add)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-add Original Leaflet documentation
         */
        _this.addEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired remove event.
         * Use it with `<yaga-tile-layer (remove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-remove Original Leaflet documentation
         */
        _this.removeEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired popupopen event.
         * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-popupopen Original Leaflet documentation
         */
        _this.popupopenEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired popupclose event.
         * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-popupclose Original Leaflet documentation
         */
        _this.popupcloseEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired tooltipopen event.
         * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tooltipopen Original Leaflet documentation
         */
        _this.tooltipopenEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired tooltipclose event.
         * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tooltipclose Original Leaflet documentation
         */
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired click event.
         * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-click Original Leaflet documentation
         */
        _this.clickEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired dbclick event.
         * Use it with `<yaga-tile-layer (dbclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-dbclick Original Leaflet documentation
         */
        _this.dbclickEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired mousedown event.
         * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-mousedown Original Leaflet documentation
         */
        _this.mousedownEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired mouseover event.
         * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-mouseover Original Leaflet documentation
         */
        _this.mouseoverEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired mouseout event.
         * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-mouseout Original Leaflet documentation
         */
        _this.mouseoutEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired contextmenu event.
         * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-contextmenu Original Leaflet documentation
         */
        _this.contextmenuEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired loading event.
         * Use it with `<yaga-tile-layer (loading)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-loading Original Leaflet documentation
         */
        _this.loadingEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired tileunload event.
         * Use it with `<yaga-tile-layer (tileunload)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileunload Original Leaflet documentation
         */
        _this.tileunloadEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired tileloadstart event.
         * Use it with `<yaga-tile-layer (tileloadstart)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileloadstart Original Leaflet documentation
         */
        _this.tileloadstartEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired tileerror event.
         * Use it with `<yaga-tile-layer (tileerror)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileerror Original Leaflet documentation
         */
        _this.tileerrorEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired tileload event.
         * Use it with `<yaga-tile-layer (tileload)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileload Original Leaflet documentation
         */
        _this.tileloadEvent = new core_1.EventEmitter();
        /**
         * Form leaflet fired load event.
         * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-load Original Leaflet documentation
         */
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
    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    TileLayerDirective.prototype.ngOnDestroy = function () {
        console.log('Destroy');
        this.removeFrom(this._map);
    };
    /**
     * Derived method of the original setUrl method.
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-seturl Original Leaflet documentation
     */
    TileLayerDirective.prototype.setUrl = function (url, noRedraw) {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return _super.prototype.setUrl.call(this, url, noRedraw);
    };
    Object.defineProperty(TileLayerDirective.prototype, "url", {
        get: function () {
            return this._url;
        },
        /**
         * Two-Way binded property for the URL.
         * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer [url]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-seturl Original Leaflet documentation
         */
        set: function (val) {
            this.setUrl(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setopacity Original Leaflet documentation
     */
    TileLayerDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(TileLayerDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        /**
         * Two-Way binded property for the opacity.
         * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer [opacity]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setopacity Original Leaflet documentation
         */
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "display", {
        /**
         * Two-Way binded property for the display status of the layer.
         * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
         */
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
        /**
         * Two-Way binded property for the display status of the layer.
         * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
         */
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
    /**
     * Derived method of the original setZIndexmethod.
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setzindex Original Leaflet documentation
     */
    TileLayerDirective.prototype.setZIndex = function (val) {
        _super.prototype.setZIndex.call(this, val);
        this.zIndexChange.emit(val);
        return this;
    };
    Object.defineProperty(TileLayerDirective.prototype, "zIndex", {
        get: function () {
            return this.options.zIndex;
        },
        /**
         * Two-Way binded property for the zIndex.
         * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer [zIndex]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setzindex Original Leaflet documentation
         */
        set: function (val) {
            this.setZIndex(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "tileSize", {
        get: function () {
            return this.options.tileSize;
        },
        /**
         * Input for the tileSize.
         * Use it with `<yaga-tile-layer [tileSize]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileSize Original Leaflet documentation
         */
        set: function (val) {
            this.options.tileSize = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "updateWhenIdle", {
        get: function () {
            return this.options.updateWhenIdle;
        },
        /**
         * Input for the updateWhenIdle.
         * Use it with `<yaga-tile-layer [updateWhenIdle]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-updatewhenidle Original Leaflet documentation
         */
        set: function (val) {
            this.options.updateWhenIdle = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "updateWhenZooming", {
        get: function () {
            return this.options.updateWhenZooming;
        },
        /**
         * Input for the updateWhenZooming.
         * Use it with `<yaga-tile-layer [updateWhenZooming]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-updatewhenzooming Original Leaflet documentation
         */
        set: function (val) {
            this.options.updateWhenZooming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "updateInterval", {
        get: function () {
            return this.options.updateInterval;
        },
        /**
         * Input for the updateInterval.
         * Use it with `<yaga-tile-layer [updateInterval]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-updateinterval Original Leaflet documentation
         */
        set: function (val) {
            this.options.updateInterval = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "bounds", {
        get: function () {
            return this.options.bounds;
        },
        /**
         * Input for the bounds.
         * Use it with `<yaga-tile-layer [bounds]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-bounds Original Leaflet documentation
         */
        set: function (val) {
            this.options.bounds = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "noWrap", {
        get: function () {
            return this.options.noWrap;
        },
        /**
         * Input for the noWrap.
         * Use it with `<yaga-tile-layer [noWrap]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-nowrap Original Leaflet documentation
         */
        set: function (val) {
            this.options.noWrap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        /**
         * Input for the className.
         * Use it with `<yaga-tile-layer [className]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-classname Original Leaflet documentation
         */
        set: function (val) {
            this.options.className = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "keepBuffer", {
        get: function () {
            return this.options.keepBuffer;
        },
        /**
         * Input for the keepBuffer.
         * Use it with `<yaga-tile-layer [keepBuffer]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-keepbuffer Original Leaflet documentation
         */
        set: function (val) {
            this.options.keepBuffer = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "maxZoom", {
        get: function () {
            return this.options.maxZoom;
        },
        /**
         * Input for the maxZoom.
         * Use it with `<yaga-tile-layer [maxZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-maxzoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.maxZoom = val;
            if (this._map) {
                this._map._updateZoomLevels();
            }
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "minZoom", {
        get: function () {
            return this.options.minZoom;
        },
        /**
         * Input for the minZoom.
         * Use it with `<yaga-tile-layer [minZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-minzoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.minZoom = val;
            if (this._map) {
                this._map._updateZoomLevels();
            }
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "maxNativeZoom", {
        get: function () {
            return this.options.maxNativeZoom;
        },
        /**
         * Input for the maxNativeZoom.
         * Use it with `<yaga-tile-layer [maxNativeZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-maxnativezoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.maxNativeZoom = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "minNativeZoom", {
        get: function () {
            return this.options.minNativeZoom;
        },
        /**
         * Input for the minNativeZoom.
         * Use it with `<yaga-tile-layer [minNativeZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-minnativezoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.minNativeZoom = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "subdomains", {
        get: function () {
            if (typeof this.options.subdomains === 'string') {
                this.options.subdomains = this.options.subdomains.split('');
            }
            return this.options.subdomains;
        },
        /**
         * Input for the subdomains.
         * Use it with `<yaga-tile-layer [subdomains]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-subdomains Original Leaflet documentation
         */
        set: function (val) {
            this.options.subdomains = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "errorTileUrl", {
        get: function () {
            return this.options.errorTileUrl;
        },
        /**
         * Input for the errorTileUrl.
         * Use it with `<yaga-tile-layer [errorTileUrl]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-errortileurl Original Leaflet documentation
         */
        set: function (val) {
            this.options.errorTileUrl = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "zoomOffset", {
        get: function () {
            return this.options.zoomOffset;
        },
        /**
         * Input for the zoomOffset.
         * Use it with `<yaga-tile-layer [zoomOffset]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-zoomoffset Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomOffset = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "tms", {
        get: function () {
            return this.options.tms;
        },
        /**
         * Input for the tms.
         * Use it with `<yaga-tile-layer [tms]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tms Original Leaflet documentation
         */
        set: function (val) {
            this.options.tms = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "zoomReverse", {
        get: function () {
            return this.options.zoomReverse;
        },
        /**
         * Input for the zoomReverse.
         * Use it with `<yaga-tile-layer [zoomReverse]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-zoomreverse Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomReverse = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "detectRetina", {
        get: function () {
            return this.options.detectRetina;
        },
        /**
         * Input for the detectRetina.
         * Use it with `<yaga-tile-layer [detectRetina]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-detectretina Original Leaflet documentation
         */
        set: function (val) {
            this.options.detectRetina = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "crossOrigin", {
        get: function () {
            return this.options.crossOrigin;
        },
        /**
         * Input for the crossOrigin.
         * Use it with `<yaga-tile-layer [crossOrigin]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-crossorigin Original Leaflet documentation
         */
        set: function (val) {
            this.options.crossOrigin = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TileLayerDirective.prototype, "attribution", {
        get: function () {
            return this.getAttribution();
        },
        /**
         * Input for the attribution.
         * Use it with `<yaga-tile-layer [attribution]="someValue">`
         * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-attribution Original Leaflet documentation
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
    return TileLayerDirective;
}(leaflet_1.TileLayer));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "urlChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "zIndexChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Output('loading'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "loadingEvent", void 0);
__decorate([
    core_1.Output('tileunload'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "tileunloadEvent", void 0);
__decorate([
    core_1.Output('tileloadstart'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "tileloadstartEvent", void 0);
__decorate([
    core_1.Output('tileerror'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "tileerrorEvent", void 0);
__decorate([
    core_1.Output('tileload'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "tileloadEvent", void 0);
__decorate([
    core_1.Output('load'),
    __metadata("design:type", core_1.EventEmitter)
], TileLayerDirective.prototype, "loadEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TileLayerDirective.prototype, "url", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "zIndex", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Point),
    __metadata("design:paramtypes", [leaflet_1.Point])
], TileLayerDirective.prototype, "tileSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "updateWhenIdle", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "updateWhenZooming", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "updateInterval", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TileLayerDirective.prototype, "bounds", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "noWrap", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TileLayerDirective.prototype, "className", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "keepBuffer", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "maxZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "minZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "maxNativeZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "minNativeZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], TileLayerDirective.prototype, "subdomains", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TileLayerDirective.prototype, "errorTileUrl", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TileLayerDirective.prototype, "zoomOffset", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "tms", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "zoomReverse", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "detectRetina", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TileLayerDirective.prototype, "crossOrigin", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TileLayerDirective.prototype, "attribution", null);
TileLayerDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-tile-layer'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], TileLayerDirective);
exports.TileLayerDirective = TileLayerDirective;
//# sourceMappingURL=tile-layer.directive.js.map