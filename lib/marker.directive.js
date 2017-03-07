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
// Content-Child imports
var popup_directive_1 = require("./popup.directive");
var tooltip_directive_1 = require("./tooltip.directive");
var icon_directive_1 = require("./icon.directive");
var MarkerDirective = (function (_super) {
    __extends(MarkerDirective, _super);
    function MarkerDirective(mapComponent) {
        var _this = _super.call(this, [0, 0]) || this;
        _this.positionChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        _this.displayChange = new core_1.EventEmitter();
        _this.zindexChange = new core_1.EventEmitter();
        _this.draggableChange = new core_1.EventEmitter();
        _this.iconChange = new core_1.EventEmitter();
        _this.tooltipOpenedChange = new core_1.EventEmitter();
        _this.popupOpenedChange = new core_1.EventEmitter();
        _this.dragendEvent = new core_1.EventEmitter();
        _this.dragstartEvent = new core_1.EventEmitter();
        _this.movestartEvent = new core_1.EventEmitter();
        _this.dragEvent = new core_1.EventEmitter();
        _this.moveendEvent = new core_1.EventEmitter();
        _this.initialized = false;
        mapComponent.addLayer(_this);
        _this.on('remove', function () {
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        _this.on('drag', function (event) {
            _this.latChange.emit(_this.getLatLng().lat);
            _this.lngChange.emit(_this.getLatLng().lng);
            _this.positionChange.emit(_this.getLatLng());
        });
        // Events
        _this.on('dragend', function (event) {
            _this.dragendEvent.emit(event);
        });
        _this.on('dragstart', function (event) {
            _this.dragstartEvent.emit(event);
        });
        _this.on('movestart', function (event) {
            _this.movestartEvent.emit(event);
        });
        _this.on('drag', function (event) {
            _this.dragEvent.emit(event);
        });
        _this.on('moveend', function (event) {
            _this.moveendEvent.emit(event);
        });
        var oldDraggingEnable = _this.dragging.enable;
        var oldDraggingDisable = _this.dragging.disable;
        _this.dragging.enable = function () {
            var val = oldDraggingEnable.call(_this.dragging);
            _this.draggableChange.emit(true);
            return val;
        };
        _this.dragging.disable = function () {
            var val = oldDraggingDisable.call(_this.dragging);
            _this.draggableChange.emit(false);
            return val;
        };
        return _this;
        // TODO: this.addIcon(IconDirective / DivIconDirective)
    }
    MarkerDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initialized = true; // Otherwise lng gets overwritten to 0
        if (this.iconDirective) {
            this.setIcon(this.iconDirective);
            this.iconDirective.updateEvent.subscribe(function (event) {
                _this.setIcon(event.target); // TODO: with event.target or with this.iconDirective???
            });
        }
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    };
    MarkerDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    Object.defineProperty(MarkerDirective.prototype, "display", {
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
    MarkerDirective.prototype.setLatLng = function (val) {
        _super.prototype.setLatLng.call(this, val);
        if (this.initialized) {
            this.positionChange.emit(this.getLatLng());
            this.latChange.emit(this.getLatLng().lat);
            this.lngChange.emit(this.getLatLng().lng);
        }
        return this;
    };
    Object.defineProperty(MarkerDirective.prototype, "position", {
        get: function () {
            return this.getLatLng();
        },
        set: function (val) {
            this.setLatLng(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "lat", {
        get: function () {
            return this.getLatLng().lat;
        },
        set: function (val) {
            this.setLatLng([val, this.lng]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "lng", {
        get: function () {
            return this.getLatLng().lng;
        },
        set: function (val) {
            this.setLatLng([this.lat, val]);
        },
        enumerable: true,
        configurable: true
    });
    MarkerDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(MarkerDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    MarkerDirective.prototype.setIcon = function (val) {
        _super.prototype.setIcon.call(this, val);
        this.iconChange.emit(val);
        return this;
    };
    Object.defineProperty(MarkerDirective.prototype, "icon", {
        get: function () {
            return this.options.icon;
        },
        set: function (val) {
            this.setIcon(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "draggable", {
        get: function () {
            return this.dragging.enabled();
        },
        set: function (val) {
            if (val) {
                this.dragging.enable();
                return;
            }
            this.dragging.disable();
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "title", {
        get: function () {
            return this.getElement().getAttribute('title');
        },
        set: function (val) {
            this.options.title = val;
            this.getElement().setAttribute('title', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "alt", {
        get: function () {
            return this.getElement().getAttribute('alt');
        },
        set: function (val) {
            this.options.alt = val;
            this.getElement().setAttribute('alt', val);
        },
        enumerable: true,
        configurable: true
    });
    return MarkerDirective;
}(leaflet_1.Marker));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "positionChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "latChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "lngChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "opacityChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "displayChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "zindexChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "draggableChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "iconChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "tooltipOpenedChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "popupOpenedChange", void 0);
__decorate([
    core_1.Output('dragend'),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "dragendEvent", void 0);
__decorate([
    core_1.Output('dragstart'),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "dragstartEvent", void 0);
__decorate([
    core_1.Output('movestart'),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "movestartEvent", void 0);
__decorate([
    core_1.Output('drag'),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "dragEvent", void 0);
__decorate([
    core_1.Output('moveend'),
    __metadata("design:type", core_1.EventEmitter)
], MarkerDirective.prototype, "moveendEvent", void 0);
__decorate([
    core_1.ContentChild(popup_directive_1.PopupDirective),
    __metadata("design:type", popup_directive_1.PopupDirective)
], MarkerDirective.prototype, "popupDirective", void 0);
__decorate([
    core_1.ContentChild(tooltip_directive_1.TooltipDirective),
    __metadata("design:type", tooltip_directive_1.TooltipDirective)
], MarkerDirective.prototype, "tooltipDirective", void 0);
__decorate([
    core_1.ContentChild(icon_directive_1.IconDirective),
    __metadata("design:type", icon_directive_1.IconDirective)
], MarkerDirective.prototype, "iconDirective", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MarkerDirective.prototype, "display", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.LatLng),
    __metadata("design:paramtypes", [leaflet_1.LatLng])
], MarkerDirective.prototype, "position", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MarkerDirective.prototype, "lat", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MarkerDirective.prototype, "lng", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], MarkerDirective.prototype, "opacity", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", leaflet_1.Icon),
    __metadata("design:paramtypes", [leaflet_1.Icon])
], MarkerDirective.prototype, "icon", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MarkerDirective.prototype, "draggable", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], MarkerDirective.prototype, "title", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], MarkerDirective.prototype, "alt", null);
MarkerDirective = __decorate([
    core_1.Directive({
        selector: 'yaga-marker'
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return map_component_1.MapComponent; }))),
    __metadata("design:paramtypes", [map_component_1.MapComponent])
], MarkerDirective);
exports.MarkerDirective = MarkerDirective;
//# sourceMappingURL=marker.directive.js.map