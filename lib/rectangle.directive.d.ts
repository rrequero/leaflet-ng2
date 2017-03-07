/// <reference types="leaflet" />
/// <reference types="geojson" />
import { EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Rectangle, PolylineOptions, Event, PopupEvent, TooltipEvent, PathOptions, FillRule, LineCapShape, LineJoinShape, LatLng, LatLngTuple, LatLngBounds, LatLngExpression, LatLngBoundsLiteral } from 'leaflet';
import { MapComponent } from './map.component';
import { GenericGeoJSONFeature } from '@yaga/generic-geojson';
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';
export declare class RectangleDirective<T> extends Rectangle implements OnDestroy, AfterViewInit {
    displayChange: EventEmitter<boolean>;
    strokeChange: EventEmitter<boolean>;
    colorChange: EventEmitter<string>;
    weightChange: EventEmitter<number>;
    opacityChange: EventEmitter<number>;
    lineCapChange: EventEmitter<string>;
    lineJoinChange: EventEmitter<string>;
    dashArrayChange: EventEmitter<string>;
    dashOffsetChange: EventEmitter<string>;
    fillChange: EventEmitter<boolean>;
    fillColorChange: EventEmitter<string>;
    fillOpacityChange: EventEmitter<number>;
    fillRuleChange: EventEmitter<string>;
    classNameChange: EventEmitter<string>;
    styleChange: EventEmitter<PathOptions>;
    latLngsChange: EventEmitter<LatLng[]>;
    boundsChange: EventEmitter<LatLngBounds>;
    northChange: EventEmitter<number>;
    eastChange: EventEmitter<number>;
    southChange: EventEmitter<number>;
    westChange: EventEmitter<number>;
    geoJSONChange: EventEmitter<GenericGeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>>;
    addEvent: EventEmitter<Event>;
    removeEvent: EventEmitter<Event>;
    popupopenEvent: EventEmitter<PopupEvent>;
    popupcloseEvent: EventEmitter<PopupEvent>;
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    dbclickEvent: EventEmitter<MouseEvent>;
    mousedownEvent: EventEmitter<MouseEvent>;
    mouseoverEvent: EventEmitter<MouseEvent>;
    mouseoutEvent: EventEmitter<MouseEvent>;
    contextmenuEvent: EventEmitter<MouseEvent>;
    popupDirective: PopupDirective;
    tooltipDirective: TooltipDirective;
    private initialized;
    constructor(mapComponent: MapComponent);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setBounds(val: LatLngBounds | LatLngBoundsLiteral): this;
    bounds: LatLngBounds;
    north: number;
    east: number;
    south: number;
    west: number;
    setLatLngs(val: ((LatLng | LatLngTuple | LatLngExpression)[] | (LatLng | LatLngTuple | LatLngExpression)[][] | (LatLng | LatLngTuple | LatLngExpression)[][][])): this;
    addLatLng(val: (LatLng | LatLngTuple | LatLngExpression) | (LatLng | LatLngTuple | LatLngExpression)[]): this;
    latLngs: LatLng[] | LatLng[][] | LatLng[][][];
    geoJSON: GenericGeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>;
    setStyle(style: PathOptions): this;
    opacity: number;
    stroke: boolean;
    color: string;
    weight: number;
    lineCap: LineCapShape;
    lineJoin: LineJoinShape;
    dashArray: string;
    dashOffset: string;
    fill: boolean;
    fillColor: string;
    fillOpacity: number;
    fillRule: FillRule;
    className: string;
    style: PolylineOptions;
    display: boolean;
    interactive: boolean;
    smoothFactor: number;
    noClip: boolean;
    properties: T;
}
