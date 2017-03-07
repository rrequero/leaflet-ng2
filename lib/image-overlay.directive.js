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
var ImageOverlayDirective = (function (_super) {
    __extends(ImageOverlayDirective, _super);
    function ImageOverlayDirective(mapComponent) {
        var _this = 
        // Transparent 1px image:
        _super.call(this, consts_1.TRANSPARENT_PIXEL, [[0, 0], [1, 1]], {}) || this;
        _this.urlChange = new core_1.EventEmitter();
        _this.displayChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        // maybe implement -> @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
        _this.boundsChange = new core_1.EventEmitter();
        _this.northChange = new core_1.EventEmitter();
        _this.eastChange = new core_1.EventEmitter();
        _this.southChange = new core_1.EventEmitter();
        _this.westChange = new core_1.EventEmitter();
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
        return _this;
    }
    ImageOverlayDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    ImageOverlayDirective.prototype.setUrl = function (url) {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return _super.prototype.setUrl.call(this, url);
    };
    Object.defineProperty(ImageOverlayDirective.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            this.setUrl(val);
        },
        enumerable: true,
        configurable: true
    });
    ImageOverlayDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(ImageOverlayDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "display", {
        get: function () {
            var pane, container;
            try {
                pane = this.getPane();
                container = this.getElement();
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
                container = this.getElement();
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
    ImageOverlayDirective.prototype.setBounds = function (val) {
        _super.prototype.setBounds.call(this, leaflet_1.latLngBounds(val));
        this.boundsChange.emit(this.bounds);
        this.northChange.emit(this.north);
        this.eastChange.emit(this.east);
        this.southChange.emit(this.south);
        this.westChange.emit(this.west);
        return this;
    };
    Object.defineProperty(ImageOverlayDirective.prototype, "bounds", {
        get: function () {
            return this.getBounds();
        },
        set: function (val) {
            this.setBounds(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "north", {
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
    Object.defineProperty(ImageOverlayDirective.prototype, "east", {
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
    Object.defineProperty(ImageOverlayDirective.prototype, "south", {
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
    Object.defineProperty(ImageOverlayDirective.prototype, "west", {
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
    Object.defineProperty(ImageOverlayDirective.prototype, "crossOrigin", {
        get: function () {
            return this.options.crossOrigin;
        },
        set: function (val) {
            this.options.crossOrigin = val;
            this.getElement().crossOrigin = val ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "alt", {
        get: function () {
            return this.getElement().getAttribute('alt');
        },
        set: function (val) {
            this.options.alt = val;
            this.getElement().alt = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "interactive", {
        get: function () {
            return this.options.interactive;
        },
        set: function (val) {
            this.options.interactive = val;
            this.onRemove(this._map);
            this.onAdd(this._map);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "attribution", {
        get: function () {
            return this.getAttribution();
        },
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
    return ImageOverlayDirective;
}(leaflet_1.ImageOverlay));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "urlChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "boundsChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "northChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "eastChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "southChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "westChange", void 0);
__decorate([
    core_1.Output('add'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "addEvent", void 0);
__decorate([
    core_1.Output('remove'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "removeEvent", void 0);
__decorate([
    core_1.Output('popupopen'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "popupopenEvent", void 0);
__decorate([
    core_1.Output('popupclose'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "popupcloseEvent", void 0);
__decorate([
    core_1.Output('tooltipopen'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "tooltipopenEvent", void 0);
__decorate([
    core_1.Output('tooltipclose'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "tooltipcloseEvent", void 0);
__decorate([
    core_1.Output('click'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "clickEvent", void 0);
__decorate([
    core_1.Output('dbclick'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "dbclickEvent", void 0);
__decorate([
    core_1.Output('mousedown'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "mousedownEvent", void 0);
__decorate([
    core_1.Output('mouseover'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "mouseoverEvent", void 0);
__decorate([
    core_1.Output('mouseout'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "mouseoutEvent", void 0);
__decorate([
    core_1.Output('contextmenu'),
    __metadata("design:type", core_1.EventEmitter)
], ImageOverlayDirective.prototype, "contextmenuEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageOverlayDirective.prototype, "url", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ImageOverlayDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ImageOverlayDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.LatLngBounds),
    __metadata("design:paramtypes", [leaflet_1.LatLngBounds])
], ImageOverlayDirective.prototype, "bounds", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ImageOverlayDirective.prototype, "north", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ImageOverlayDirective.prototype, "east", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ImageOverlayDirective.prototype, "south", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ImageOverlayDirective.prototype, "west", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ImageOverlayDirective.prototype, "crossOrigin", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageOverlayDirective.prototype, "alt", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ImageOverlayDirective.prototype, "interactive", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageOverlayDirective.prototype, "attribution", null);
ImageOverlayDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-image-overlay'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], ImageOverlayDirective);
exports.ImageOverlayDirective = ImageOverlayDirective;
//# sourceMappingURL=image-overlay.directive.js.map