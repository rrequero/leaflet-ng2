/// <reference types="leaflet" />
import { EventEmitter } from '@angular/core';
import { Icon, Event, Point } from 'leaflet';
export declare class IconDirective extends Icon {
    updateEvent: EventEmitter<Event>;
    constructor();
    iconUrl: string;
    iconSize: Point;
    iconAnchor: Point;
    popupAnchor: Point;
    shadowUrl: string;
    shadowSize: Point;
    shadowAnchor: Point;
}
