/// <reference types="leaflet" />
import { EventEmitter, ElementRef } from '@angular/core';
import { DivIcon, Event, Point } from 'leaflet';
export declare class DivIconDirective extends DivIcon {
    updateEvent: EventEmitter<Event>;
    protected contentHtml: HTMLElement;
    constructor(elementRef: ElementRef);
    iconSize: Point;
    iconAnchor: Point;
    popupAnchor: Point;
    createIcon(oldDivIcon: HTMLElement): HTMLElement;
}
