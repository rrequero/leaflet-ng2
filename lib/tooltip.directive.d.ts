/// <reference types="leaflet" />
import { EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Tooltip, Point, LatLng, Event, Content, LatLngExpression, Direction } from 'leaflet';
import { MapComponent } from './map.component';
export declare class TooltipDirective extends Tooltip implements OnDestroy {
    contentChange: EventEmitter<Content>;
    openedChange: EventEmitter<boolean>;
    latChange: EventEmitter<number>;
    lngChange: EventEmitter<number>;
    positionChange: EventEmitter<LatLng>;
    opacityChange: EventEmitter<number>;
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
    setOpacity(val: number): void;
    opacity: number;
    className: string;
    pane: string;
    interactive: boolean;
    sticky: boolean;
    direction: Direction;
    permanent: boolean;
    offset: Point;
}
