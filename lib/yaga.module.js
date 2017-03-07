"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var map_component_1 = require("./map.component");
var tile_layer_directive_1 = require("./tile-layer.directive");
var image_overlay_directive_1 = require("./image-overlay.directive");
var popup_directive_1 = require("./popup.directive");
var tooltip_directive_1 = require("./tooltip.directive");
var icon_directive_1 = require("./icon.directive");
var div_icon_directive_1 = require("./div-icon.directive");
var marker_directive_1 = require("./marker.directive");
var polyline_directive_1 = require("./polyline.directive");
var polygon_directive_1 = require("./polygon.directive");
var rectangle_directive_1 = require("./rectangle.directive");
var circle_directive_1 = require("./circle.directive");
var circle_marker_directive_1 = require("./circle-marker.directive");
var zoom_control_directive_1 = require("./zoom-control.directive");
var attribution_control_directive_1 = require("./attribution-control.directive");
var scale_control_directive_1 = require("./scale-control.directive");
var YagaModule = (function () {
    function YagaModule() {
    }
    return YagaModule;
}());
YagaModule = __decorate([
    core_1.NgModule({
        declarations: [
            map_component_1.MapComponent,
            tile_layer_directive_1.TileLayerDirective,
            image_overlay_directive_1.ImageOverlayDirective,
            popup_directive_1.PopupDirective,
            tooltip_directive_1.TooltipDirective,
            icon_directive_1.IconDirective,
            div_icon_directive_1.DivIconDirective,
            marker_directive_1.MarkerDirective,
            polyline_directive_1.PolylineDirective,
            polygon_directive_1.PolygonDirective,
            rectangle_directive_1.RectangleDirective,
            circle_directive_1.CircleDirective,
            circle_marker_directive_1.CircleMarkerDirective,
            zoom_control_directive_1.ZoomControlDirective,
            attribution_control_directive_1.AttributionControlDirective,
            scale_control_directive_1.ScaleControlDirective
        ],
        exports: [
            map_component_1.MapComponent,
            tile_layer_directive_1.TileLayerDirective,
            image_overlay_directive_1.ImageOverlayDirective,
            popup_directive_1.PopupDirective,
            tooltip_directive_1.TooltipDirective,
            icon_directive_1.IconDirective,
            div_icon_directive_1.DivIconDirective,
            marker_directive_1.MarkerDirective,
            polyline_directive_1.PolylineDirective,
            polygon_directive_1.PolygonDirective,
            rectangle_directive_1.RectangleDirective,
            circle_directive_1.CircleDirective,
            circle_marker_directive_1.CircleMarkerDirective,
            zoom_control_directive_1.ZoomControlDirective,
            attribution_control_directive_1.AttributionControlDirective,
            scale_control_directive_1.ScaleControlDirective
        ]
    })
], YagaModule);
exports.YagaModule = YagaModule;
//# sourceMappingURL=yaga.module.js.map