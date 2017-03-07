/// <reference types="leaflet" />
import { EventEmitter, OnDestroy } from '@angular/core';
import { TileLayer, LatLngBoundsExpression, Point, Event, PopupEvent, TooltipEvent, TileEvent, TileErrorEvent, WMSParams } from 'leaflet';
import { MapComponent } from './map.component';
export declare class WmsLayerDirective extends TileLayer.WMS implements OnDestroy {
    urlChange: EventEmitter<string>;
    displayChange: EventEmitter<boolean>;
    opacityChange: EventEmitter<number>;
    zIndexChange: EventEmitter<number>;
    layersChange: EventEmitter<string[]>;
    stylesChange: EventEmitter<string[]>;
    formatChange: EventEmitter<string>;
    versionChange: EventEmitter<string>;
    transparentChange: EventEmitter<boolean>;
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
    loadingEvent: EventEmitter<Event>;
    tileunloadEvent: EventEmitter<TileEvent>;
    tileloadstartEvent: EventEmitter<TileEvent>;
    tileerrorEvent: EventEmitter<TileErrorEvent>;
    tileloadEvent: EventEmitter<TileEvent>;
    loadEvent: EventEmitter<Event>;
    constructor(mapComponent: MapComponent);
    ngOnDestroy(): void;
    setUrl(url: string, noRedraw?: boolean): this;
    url: string;
    setOpacity(val: number): this;
    opacity: number;
    display: boolean;
    setZIndex(val: number): this;
    zIndex: number;
    tileSize: Point;
    updateWhenIdle: boolean;
    updateWhenZooming: boolean;
    updateInterval: number;
    bounds: LatLngBoundsExpression;
    noWrap: boolean;
    className: string;
    keepBuffer: number;
    maxNativeZoom: number;
    minNativeZoom: number;
    subdomains: string[];
    errorTileUrl: string;
    zoomOffset: number;
    tms: boolean;
    zoomReverse: boolean;
    detectRetina: boolean;
    crossOrigin: boolean;
    uppercase: boolean;
    setParams(params: WMSParams, redraw?: boolean): this;
    layers: string[];
    styles: string[];
    format: string;
    version: string;
    transparent: boolean;
    /**
     * Input for the attribution.
     * Use it with `<yaga-wms-layer [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#wmslayer-attribution Original Leaflet documentation
     */
    attribution: string;
}
