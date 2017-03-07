/// <reference types="leaflet" />
import { EventEmitter, OnDestroy } from '@angular/core';
import { Control, ControlPosition, Event } from 'leaflet';
import { MapComponent } from './map.component';
export declare class ScaleControlDirective extends Control.Scale implements OnDestroy {
    displayChange: EventEmitter<boolean>;
    zIndexChange: EventEmitter<number>;
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
    maxWidth: number;
    metric: boolean;
    imperial: boolean;
}
