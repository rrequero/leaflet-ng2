/// <reference types="leaflet" />
import { EventEmitter, OnDestroy } from '@angular/core';
import { Control, ControlPosition, Event } from 'leaflet';
import { MapComponent } from './map.component';
export declare class AttributionControlDirective extends Control.Attribution implements OnDestroy {
    displayChange: EventEmitter<boolean>;
    zIndexChange: EventEmitter<number>;
    positionChange: EventEmitter<string>;
    prefixChange: EventEmitter<string>;
    attributionsChange: EventEmitter<string[]>;
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
    setPrefix(prefix: string): this;
    prefix: string;
    addAttribution(val: string): this;
    removeAttribution(val: string): this;
    attributions: string[];
    removeAllAttributions(silent?: boolean): this;
}
