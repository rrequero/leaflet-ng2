/// <reference types="leaflet" />
import { EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Popup, Point, LatLng, Event, Content, LatLngExpression } from 'leaflet';
import { MapComponent } from './map.component';
export declare class PopupDirective extends Popup implements OnDestroy {
    contentChange: EventEmitter<Content>;
    openedChange: EventEmitter<boolean>;
    latChange: EventEmitter<number>;
    lngChange: EventEmitter<number>;
    positionChange: EventEmitter<LatLng>;
    openEvent: EventEmitter<Event>;
    closeEvent: EventEmitter<Event>;
    protected map: MapComponent;
    constructor(mapComponent: MapComponent, elementRef: ElementRef);
    ngOnDestroy(): void;
    setContent(content: any): this;
    content: Content;
    opened: boolean;
    setLatLng(latlng: LatLngExpression): this;
    lat: number;
    lng: number;
    position: LatLng;
    maxWidth: number;
    minWidth: number;
    maxHeight: number;
    autoPan: boolean;
    autoPanPaddingTopLeft: Point;
    autoPanPaddingBottomRight: Point;
    autoPanPadding: Point;
    keepInView: boolean;
    closeButton: boolean;
    autoClose: boolean;
    className: string;
    pane: string;
}
