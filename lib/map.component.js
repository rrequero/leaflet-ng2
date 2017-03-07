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
var consts_1 = require("./consts");
var MapComponent = (function (_super) {
    __extends(MapComponent, _super);
    function MapComponent(elementRef) {
        var _this = _super.call(this, document.createElement('div'), { attributionControl: false, zoomControl: false }) || this;
        _this.zoomChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.minZoomChange = new core_1.EventEmitter();
        _this.maxZoomChange = new core_1.EventEmitter();
        _this.maxBoundsChange = new core_1.EventEmitter();
        _this.baselayerchangeEvent = new core_1.EventEmitter();
        _this.overlayaddEvent = new core_1.EventEmitter();
        _this.overlayremoveEvent = new core_1.EventEmitter();
        _this.layeraddEvent = new core_1.EventEmitter();
        _this.layerremoveEvent = new core_1.EventEmitter();
        _this.zoomlevelschangeEvent = new core_1.EventEmitter();
        _this.resizeEvent = new core_1.EventEmitter();
        _this.unloadEvent = new core_1.EventEmitter();
        _this.viewresetEvent = new core_1.EventEmitter();
        _this.loadEvent = new core_1.EventEmitter();
        _this.zoomstartEvent = new core_1.EventEmitter();
        _this.movestartEvent = new core_1.EventEmitter();
        _this.zoomEvent = new core_1.EventEmitter();
        _this.moveEvent = new core_1.EventEmitter();
        _this.zoomendEvent = new core_1.EventEmitter();
        _this.moveendEvent = new core_1.EventEmitter();
        _this.popupopenEvent = new core_1.EventEmitter();
        _this.popupcloseEvent = new core_1.EventEmitter();
        _this.autopanstartEvent = new core_1.EventEmitter();
        _this.tooltipopenEvent = new core_1.EventEmitter();
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        _this.clickEvent = new core_1.EventEmitter();
        _this.dblclickEvent = new core_1.EventEmitter();
        _this.mousedownEvent = new core_1.EventEmitter();
        _this.mouseupEvent = new core_1.EventEmitter();
        _this.mouseoverEvent = new core_1.EventEmitter();
        _this.mouseoutEvent = new core_1.EventEmitter();
        _this.mousemoveEvent = new core_1.EventEmitter();
        _this.contextmenuEvent = new core_1.EventEmitter();
        _this.keypressEvent = new core_1.EventEmitter();
        _this.preclickEvent = new core_1.EventEmitter();
        _this.zoomanimEvent = new core_1.EventEmitter();
        _this.isZooming = false;
        var moveFn = function () {
            if (_this.isZooming) {
                _this.moveTimeout = setTimeout(moveFn, consts_1.ANIMATION_DELAY);
                return;
            }
            _this.latChange.emit(_this.lat);
            _this.lngChange.emit(_this.lng);
            _this.zoomChange.emit(_this.zoom);
            _this.moveTimeout = undefined;
        };
        _this.setView([0, 0], 0);
        _this.domRoot = elementRef.nativeElement;
        _this.mapDomRoot = _this._container;
        _this.mapDomRoot.setAttribute('class', _this.mapDomRoot.getAttribute('class') + ' yaga-map');
        _this.on('move', function () {
            if (_this.moveTimeout) {
                clearTimeout(_this.moveTimeout);
            }
            _this.moveTimeout = setTimeout(moveFn, consts_1.ANIMATION_DELAY);
        });
        _this.on('zoomstart', function () {
            _this.isZooming = true;
        });
        _this.on('zoomend', function () {
            _this.isZooming = false;
            if (_this.moveTimeout) {
                clearTimeout(_this.moveTimeout);
            }
            _this.moveTimeout = setTimeout(moveFn, consts_1.ANIMATION_DELAY);
        });
        _this.on('baselayerchange', function (event) {
            _this.baselayerchangeEvent.emit(event);
        });
        _this.on('overlayadd', function (event) {
            _this.overlayaddEvent.emit(event);
        });
        _this.on('overlayremove', function (event) {
            _this.overlayremoveEvent.emit(event);
        });
        _this.on('layeradd', function (event) {
            _this.layeraddEvent.emit(event);
        });
        _this.on('layerremove', function (event) {
            _this.layerremoveEvent.emit(event);
        });
        _this.on('zoomlevelschange', function (event) {
            _this.zoomlevelschangeEvent.emit(event);
        });
        _this.on('resize', function (event) {
            _this.resizeEvent.emit(event);
        });
        _this.on('unload', function (event) {
            _this.unloadEvent.emit(event);
        });
        _this.on('viewreset', function (event) {
            _this.viewresetEvent.emit(event);
        });
        _this.on('load', function (event) {
            _this.loadEvent.emit(event);
        });
        _this.on('zoomstart', function (event) {
            _this.zoomstartEvent.emit(event);
        });
        _this.on('movestart', function (event) {
            _this.movestartEvent.emit(event);
        });
        _this.on('zoom', function (event) {
            _this.zoomEvent.emit(event);
        });
        _this.on('move', function (event) {
            _this.moveEvent.emit(event);
        });
        _this.on('zoomend', function (event) {
            _this.zoomendEvent.emit(event);
        });
        _this.on('moveend', function (event) {
            _this.moveendEvent.emit(event);
        });
        _this.on('popupopen', function (event) {
            _this.popupopenEvent.emit(event);
        });
        _this.on('popupclose', function (event) {
            _this.popupcloseEvent.emit(event);
        });
        _this.on('autopanstart', function (event) {
            _this.autopanstartEvent.emit(event);
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
        _this.on('dblclick', function (event) {
            _this.dblclickEvent.emit(event);
        });
        _this.on('mousedown', function (event) {
            _this.mousedownEvent.emit(event);
        });
        _this.on('mouseup', function (event) {
            _this.mouseupEvent.emit(event);
        });
        _this.on('mouseover', function (event) {
            _this.mouseoverEvent.emit(event);
        });
        _this.on('mouseout', function (event) {
            _this.mouseoutEvent.emit(event);
        });
        _this.on('mousemove', function (event) {
            _this.mousemoveEvent.emit(event);
        });
        _this.on('contextmenu', function (event) {
            _this.contextmenuEvent.emit(event);
        });
        _this.on('keypress', function (event) {
            _this.keypressEvent.emit(event);
        });
        _this.on('preclick', function (event) {
            _this.preclickEvent.emit(event);
        });
        _this.on('zoomanim', function (event) {
            _this.zoomanimEvent.emit(event);
        });
        return _this;
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        this.domRoot.appendChild(this.mapDomRoot);
        this.invalidateSize(false);
    };
    Object.defineProperty(MapComponent.prototype, "zoom", {
        get: function () {
            return this.getZoom();
        },
        /*setZoom(zoom: number, options?: ZoomPanOptions): this {
         if (this.zoom === zoom) {
         return;
         }
         this.zoomChange.emit(zoom);
         return super.setZoom(zoom, options)
         }*/
        // already handled with moveend
        // setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this {
        set: function (val) {
            this.setZoom(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "lat", {
        get: function () {
            return this.getCenter().lat;
        },
        set: function (val) {
            var coords = new leaflet_1.LatLng(val, this.getCenter().lng);
            this.setView(coords, this.zoom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "lng", {
        get: function () {
            return this.getCenter().lng;
        },
        set: function (val) {
            var coords = new leaflet_1.LatLng(this.getCenter().lat, val);
            this.setView(coords, this.zoom);
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.prototype.setMinZoom = function (val) {
        this.minZoomChange.emit(val);
        return _super.prototype.setMinZoom.call(this, val);
    };
    Object.defineProperty(MapComponent.prototype, "minZoom", {
        get: function () {
            return this.getMinZoom();
        },
        set: function (val) {
            this.setMinZoom(val);
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.prototype.setMaxZoom = function (val) {
        this.maxZoomChange.emit(val);
        return _super.prototype.setMaxZoom.call(this, val);
    };
    Object.defineProperty(MapComponent.prototype, "maxZoom", {
        get: function () {
            return this.getMaxZoom();
        },
        set: function (val) {
            this.setMaxZoom(val);
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.prototype.setMaxBounds = function (bounds) {
        _super.prototype.setMaxBounds.call(this, bounds);
        this.maxBoundsChange.emit(this.maxBounds);
        return this;
    };
    Object.defineProperty(MapComponent.prototype, "maxBounds", {
        get: function () {
            return this.options.maxBounds;
        },
        set: function (val) {
            this.setMaxBounds(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "closePopupOnClick", {
        get: function () {
            return this.options.closePopupOnClick;
        },
        // One-way Input
        set: function (val) {
            this.options.closePopupOnClick = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomSnap", {
        get: function () {
            return this.options.zoomSnap;
        },
        set: function (val) {
            this.options.zoomSnap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomDelta", {
        get: function () {
            return this.options.zoomDelta;
        },
        set: function (val) {
            this.options.zoomDelta = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "trackResize", {
        get: function () {
            return this.options.trackResize;
        },
        set: function (val) {
            this.options.trackResize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "boxZoomEnabled", {
        get: function () {
            return this.boxZoom.enabled();
        },
        // maybe 2way!?!
        set: function (val) {
            if (val) {
                this.boxZoom.enable();
                return;
            }
            this.boxZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "doubleClickZoomEnabled", {
        get: function () {
            return this.doubleClickZoom.enabled();
        },
        // maybe 2way!?!
        set: function (val) {
            if (val) {
                this.doubleClickZoom.enable();
                return;
            }
            this.doubleClickZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "draggingEnabled", {
        get: function () {
            return this.dragging.enabled();
        },
        // maybe 2way!?!
        set: function (val) {
            if (val) {
                this.dragging.enable();
                return;
            }
            this.dragging.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "fadeAnimation", {
        get: function () {
            return this.options.fadeAnimation;
        },
        set: function (val) {
            this.options.fadeAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "markerZoomAnimation", {
        get: function () {
            return this.options.markerZoomAnimation;
        },
        set: function (val) {
            this.options.markerZoomAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "transform3DLimit", {
        get: function () {
            return this.options.transform3DLimit;
        },
        set: function (val) {
            this.options.transform3DLimit = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomAnimation", {
        get: function () {
            return this.options.zoomAnimation;
        },
        set: function (val) {
            this.options.zoomAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomAnimationThreshold", {
        get: function () {
            return this.options.zoomAnimationThreshold;
        },
        set: function (val) {
            this.options.zoomAnimationThreshold = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "inertia", {
        get: function () {
            return this.options.inertia;
        },
        set: function (val) {
            this.options.inertia = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "inertiaDeceleration", {
        get: function () {
            return this.options.inertiaDeceleration;
        },
        set: function (val) {
            this.options.inertiaDeceleration = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "inertiaMaxSpeed", {
        get: function () {
            return this.options.inertiaMaxSpeed;
        },
        set: function (val) {
            this.options.inertiaMaxSpeed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "easeLinearity", {
        get: function () {
            return this.options.easeLinearity;
        },
        set: function (val) {
            this.options.easeLinearity = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "worldCopyJump", {
        get: function () {
            return this.options.worldCopyJump;
        },
        set: function (val) {
            this.options.worldCopyJump = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "maxBoundsViscosity", {
        get: function () {
            return this.options.maxBoundsViscosity;
        },
        set: function (val) {
            this.options.maxBoundsViscosity = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "keyboardEnabled", {
        get: function () {
            return this.keyboard.enabled();
        },
        // maybe 2way!?!
        set: function (val) {
            if (val) {
                this.keyboard.enable();
                return;
            }
            this.keyboard.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "keyboardPanDelta", {
        get: function () {
            return this.options.keyboardPanDelta;
        },
        set: function (val) {
            this.options.keyboardPanDelta = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "scrollWheelZoomEnabled", {
        get: function () {
            return this.scrollWheelZoom.enabled();
        },
        // maybe 2way!?!
        set: function (val) {
            if (val) {
                this.scrollWheelZoom.enable();
                return;
            }
            this.scrollWheelZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "wheelDebounceTime", {
        get: function () {
            return this.options.wheelDebounceTime;
        },
        set: function (val) {
            this.options.wheelDebounceTime = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "wheelPxPerZoomLevel", {
        get: function () {
            return this.options.wheelPxPerZoomLevel;
        },
        set: function (val) {
            this.options.wheelPxPerZoomLevel = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "tapEnabled", {
        get: function () {
            return this.options.tap;
        },
        set: function (val) {
            this.options.tap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "tapTolerance", {
        get: function () {
            return this.options.tapTolerance;
        },
        set: function (val) {
            this.options.tapTolerance = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "bounceAtZoomLimits", {
        get: function () {
            return this.options.bounceAtZoomLimits;
        },
        set: function (val) {
            this.options.bounceAtZoomLimits = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "touchZoomEnabled", {
        get: function () {
            return this.touchZoom.enabled();
        },
        // maybe 2way!?!
        set: function (val) {
            if (val) {
                this.touchZoom.enable();
                return;
            }
            this.touchZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    return MapComponent;
}(leaflet_1.Map));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "zoomChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "latChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "lngChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "minZoomChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "maxZoomChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "maxBoundsChange", void 0);
__decorate([
    core_1.Output('baselayerchange'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "baselayerchangeEvent", void 0);
__decorate([
    core_1.Output('overlayadd'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "overlayaddEvent", void 0);
__decorate([
    core_1.Output('overlayremove'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "overlayremoveEvent", void 0);
__decorate([
    core_1.Output('layeradd'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "layeraddEvent", void 0);
__decorate([
    core_1.Output('layerremove'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "layerremoveEvent", void 0);
__decorate([
    core_1.Output('zoomlevelschange'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "zoomlevelschangeEvent", void 0);
__decorate([
    core_1.Output('resize'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "resizeEvent", void 0);
__decorate([
    core_1.Output('unload'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "unloadEvent", void 0);
__decorate([
    core_1.Output('viewreset'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "viewresetEvent", void 0);
__decorate([
    core_1.Output('load'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "loadEvent", void 0);
__decorate([
    core_1.Output('zoomstart'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "zoomstartEvent", void 0);
__decorate([
    core_1.Output('movestart'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "movestartEvent", void 0);
__decorate([
    core_1.Output('zoom'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "zoomEvent", void 0);
__decorate([
    core_1.Output('move'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "moveEvent", void 0);
__decorate([
    core_1.Output('zoomend'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "zoomendEvent", void 0);
__decorate([
    core_1.Output('moveend'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "moveendEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('autopanstart'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "autopanstartEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dblclick'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "dblclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseup'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "mouseupEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('mousemove'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "mousemoveEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Output('keypress'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "keypressEvent", void 0);
__decorate([
    core_1.Output('preclick'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "preclickEvent", void 0);
__decorate([
    core_1.Output('zoomanim'),
    __metadata("design:type", core_1.EventEmitter)
], MapComponent.prototype, "zoomanimEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "zoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "lat", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "lng", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "minZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "maxZoom", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.LatLngBounds),
    __metadata("design:paramtypes", [leaflet_1.LatLngBounds])
], MapComponent.prototype, "maxBounds", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "closePopupOnClick", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "zoomSnap", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "zoomDelta", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "trackResize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "boxZoomEnabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "doubleClickZoomEnabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "draggingEnabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "fadeAnimation", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "markerZoomAnimation", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "transform3DLimit", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "zoomAnimation", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "zoomAnimationThreshold", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "inertia", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "inertiaDeceleration", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "inertiaMaxSpeed", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "easeLinearity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "worldCopyJump", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "maxBoundsViscosity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "keyboardEnabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "keyboardPanDelta", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "scrollWheelZoomEnabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "wheelDebounceTime", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "wheelPxPerZoomLevel", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "tapEnabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MapComponent.prototype, "tapTolerance", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "bounceAtZoomLimits", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MapComponent.prototype, "touchZoomEnabled", null);
MapComponent = __decorate([
    core_1.Component({
        selector: 'yaga-map',
        template: "<span style=\"display: none\"><ng-content></ng-content></span>"
    }),
    __param(0, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [core_1.ElementRef])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map