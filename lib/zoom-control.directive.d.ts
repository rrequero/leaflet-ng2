/// <reference types="leaflet" />
import { EventEmitter, OnDestroy } from '@angular/core';
import { Control, ControlPosition, Event } from 'leaflet';
import { MapComponent } from './map.component';
export declare class ZoomControlDirective extends Control.Zoom implements OnDestroy {
    displayChange: EventEmitter<boolean>;
    positionChange: EventEmitter<string>;
    addEvent: EventEmitter<Event>;
    removeEvent: EventEmitter<Event>;
    clickEvent: EventEmitter<MouseEvent>;
    dbclickEvent: EventEmitter<MouseEvent>;
    mousedownEvent: EventEmitter<MouseEvent>;
    mouseoverEvent: EventEmitter<MouseEvent>;
    mouseoutEvent: EventEmitter<MouseEvent>;
    constructor(mapComponent: MapComponent);
    ngOnDestroy(): void;
    setPosition(val: ControlPosition): this;
    opacity: number;
    display: boolean;
    position: ControlPosition;
    zoomInText: string;
    zoomInTitle: string;
    zoomOutText: string;
    zoomOutTitle: string;
    zIndex: number;
}
