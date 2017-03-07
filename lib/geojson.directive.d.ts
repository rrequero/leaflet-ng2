/// <reference types="leaflet" />
/// <reference types="geojson" />
import { EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { GeoJSON, Event, PopupEvent, TooltipEvent, PathOptions, LatLng, Layer } from 'leaflet';
import { MapComponent } from './map.component';
import { GenericGeoJSONFeatureCollection, GenericGeoJSONFeature } from '@yaga/generic-geojson';
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';
export declare class GeoJSONDirective<T> extends GeoJSON implements OnDestroy, AfterViewInit {
    dataChange: EventEmitter<GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>>;
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
    onEachFeatureEvent: EventEmitter<{
        feature: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>;
        layer: Layer;
    }>;
    defaultStyle: PathOptions;
    popupDirective: PopupDirective;
    tooltipDirective: TooltipDirective;
    protected mapComponent: MapComponent;
    protected initialized: boolean;
    constructor(mapComponent: MapComponent);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    pointToLayer(geoJSON: GenericGeoJSONFeature<GeoJSON.Point, T>, latLng: LatLng): Layer;
    styler(geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>, defaultStyle: PathOptions): PathOptions;
    filterFeatures(geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): boolean;
    addData(data: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): Layer;
    setData(val: GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>): this;
    data: GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>;
}
