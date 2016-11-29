/// <reference path="../typings/index.d.ts" />

import { Component,
    AfterViewInit,
    ElementRef,
    Inject,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {
    Map,
    LatLng,
    LatLngBoundsExpression,
    LatLngBounds,
    LatLngBoundsLiteral,
    LayersControlEvent,
    LayerEvent,
    Event,
    ResizeEvent,
    PopupEvent,
    TooltipEvent,
    MouseEvent,
    KeyboardEvent,
    ZoomAnimEvent,
    MapOptions
} from 'leaflet';

const ANIMATION_DELAY: number = 50; // delay to wait for UI Changes...

/**
 * @classdesc [Leaflet Map](http://leafletjs.com/reference-1.0.2.html#map)
 * @class L.Map
 * @link http://leafletjs.com/reference-1.0.2.html#map
 */

/**
 * Yaga Map root component
 * @extends L.Map
 * @class MapComponent
 * @classdesc Yaga Map-Component `<yaga-map>`
 * @param {"@angular/core".ElementRef} dom - Element DOM root as ElementRef (@Injected)
 */
@Component({
    selector: 'yaga-map',
    template: `<span style="display: none"><ng-content></ng-content></span>`
})
export class MapComponent extends Map implements AfterViewInit {
    /**
     * Emitter for change on property zoom `[(zoom)]`
     * @member MapComponent.zoomChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public zoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Emitter for change on property lat `[(lat)]`
     * @member MapComponent.latChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Emitter for change on property lng `[(lng)]`
     * @member MapComponent.lngChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Emitter for change on property minZoom `[(minZoom)]`
     * @member MapComponent.minZoomChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public minZoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Emitter for change on property maxZoom `[(maxZoom)]`
     * @member MapComponent.maxZoomChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public maxZoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Emitter for change on property maxBounds `[(maxBounds)]`
     * @member MapComponent.maxBoundsChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public maxBoundsChange: EventEmitter<LatLngBounds> = new EventEmitter();

    /**
     * Piped event `(baselayerchange)`
     * @member MapComponent.baselayerchangeEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('baselayerchange') public baselayerchangeEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * Piped event `(overlayadd)`
     * @member MapComponent.overlayaddEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('overlayadd') public overlayaddEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * Piped event `(overlayremove)`
     * @member MapComponent.overlayremoveEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('overlayremove') public overlayremoveEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * Piped event `(layeradd)`
     * @member MapComponent.layeraddEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('layeradd') public layeraddEvent: EventEmitter<LayerEvent> = new EventEmitter();
    /**
     * Piped event `(layerremove)`
     * @member MapComponent.layerremoveEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('layerremove') public layerremoveEvent: EventEmitter<LayerEvent> = new EventEmitter();
    /**
     * Piped event `(zoomlevelschange)`
     * @member MapComponent.zoomlevelschangeEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('zoomlevelschange') public zoomlevelschangeEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(resize)`
     * @member MapComponent.resizeEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('resize') public resizeEvent: EventEmitter<ResizeEvent> = new EventEmitter();
    /**
     * Piped event `(unload)`
     * @member MapComponent.unloadEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('unload') public unloadEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(viewreset)`
     * @member MapComponent.viewresetEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('viewreset') public viewresetEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(load)`
     * @member MapComponent.loadEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('load') public loadEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(zoomstart)`
     * @member MapComponent.zoomstartEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('zoomstart') public zoomstartEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(movestart)`
     * @member MapComponent.movestartEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('movestart') public movestartEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(zoom)`
     * @member MapComponent.zoomEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('zoom') public zoomEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(move)`
     * @member MapComponent.moveEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('move') public moveEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(zoomend)`
     * @member MapComponent.zoomendEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('zoomend') public zoomendEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(moveend)`
     * @member MapComponent.moveendEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('moveend') public moveendEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(popupopen)`
     * @member MapComponent.popupopenEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * Piped event `(popupclose)`
     * @member MapComponent.popupcloseEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * Piped event `(autopanstart)`
     * @member MapComponent.autopanstartEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('autopanstart') public autopanstartEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(tooltipopen)`
     * @member MapComponent.tooltipopenEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * Piped event `(tooltipclose)`
     * @member MapComponent.tooltipcloseEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * Piped event `(click)`
     * @member MapComponent.clickEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(dblclick)`
     * @member MapComponent.dblclickEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('dblclick') public dblclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mousedown)`
     * @member MapComponent.mousedownEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mouseup)`
     * @member MapComponent.mouseupEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mouseup') public mouseupEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mouseover)`
     * @member MapComponent.mouseoverEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mouseout)`
     * @member MapComponent.mouseoutEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mousemove)`
     * @member MapComponent.mousemoveEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mousemove') public mousemoveEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(contextmenu)`
     * @member MapComponent.contextmenuEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(keypress)`
     * @member MapComponent.keypressEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('keypress') public keypressEvent: EventEmitter<KeyboardEvent> = new EventEmitter();
    /**
     * Piped event `(preclick)`
     * @member MapComponent.preclickEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('preclick') public preclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(zoomanim)`
     * @member MapComponent.zoomanimEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('zoomanim') public zoomanimEvent: EventEmitter<ZoomAnimEvent> = new EventEmitter();

    protected domRoot: HTMLElement;
    protected mapDomRoot: HTMLElement;

    private moveTimeout: number;
    private isZooming: boolean = false;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super(document.createElement('div'), { attributionControl: false, zoomControl: false});

        const moveFn: Function = () => {
            if (this.isZooming) {
                this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
                return;
            }
            this.latChange.emit(this.lat);
            this.lngChange.emit(this.lng);
            this.zoomChange.emit(this.zoom);
            this.moveTimeout = undefined;
        };

        this.setView([0, 0], 0);

        this.domRoot = elementRef.nativeElement;
        this.mapDomRoot = (<any>this)._container;
        this.mapDomRoot.setAttribute('class', this.mapDomRoot.getAttribute('class') + ' yaga-map');

        this.on('move', () => {
            if (this.moveTimeout) {
                clearTimeout(this.moveTimeout);
            }
            this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
        });
        this.on('zoomstart', () => {
            this.isZooming = true;
        });
        this.on('zoomend', () => {
            this.isZooming = false;
            if (this.moveTimeout) {
                clearTimeout(this.moveTimeout);
            }
            this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
        });

        this.on('baselayerchange', (event: LayersControlEvent) => {
            this.baselayerchangeEvent.emit(event);
        });
        this.on('overlayadd', (event: LayersControlEvent) => {
            this.overlayaddEvent.emit(event);
        });
        this.on('overlayremove', (event: LayersControlEvent) => {
            this.overlayremoveEvent.emit(event);
        });
        this.on('layeradd', (event: LayerEvent) => {
            this.layeraddEvent.emit(event);
        });
        this.on('layerremove', (event: LayerEvent) => {
            this.layerremoveEvent.emit(event);
        });
        this.on('zoomlevelschange', (event: Event) => {
            this.zoomlevelschangeEvent.emit(event);
        });
        this.on('resize', (event: ResizeEvent) => {
            this.resizeEvent.emit(event);
        });
        this.on('unload', (event: Event) => {
            this.unloadEvent.emit(event);
        });
        this.on('viewreset', (event: Event) => {
            this.viewresetEvent.emit(event);
        });
        this.on('load', (event: Event) => {
            this.loadEvent.emit(event);
        });
        this.on('zoomstart', (event: Event) => {
            this.zoomstartEvent.emit(event);
        });
        this.on('movestart', (event: Event) => {
            this.movestartEvent.emit(event);
        });
        this.on('zoom', (event: Event) => {
            this.zoomEvent.emit(event);
        });
        this.on('move', (event: Event) => {
            this.moveEvent.emit(event);
        });
        this.on('zoomend', (event: Event) => {
            this.zoomendEvent.emit(event);
        });
        this.on('moveend', (event: Event) => {
            this.moveendEvent.emit(event);
        });
        this.on('popupopen', (event: PopupEvent) => {
            this.popupopenEvent.emit(event);
        });
        this.on('popupclose', (event: PopupEvent) => {
            this.popupcloseEvent.emit(event);
        });
        this.on('autopanstart', (event: Event) => {
            this.autopanstartEvent.emit(event);
        });
        this.on('tooltipopen', (event: TooltipEvent) => {
            this.tooltipopenEvent.emit(event);
        });
        this.on('tooltipclose', (event: TooltipEvent) => {
            this.tooltipcloseEvent.emit(event);
        });
        this.on('click', (event: MouseEvent) => {
            this.clickEvent.emit(event);
        });
        this.on('dblclick', (event: MouseEvent) => {
            this.dblclickEvent.emit(event);
        });
        this.on('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.on('mouseup', (event: MouseEvent) => {
            this.mouseupEvent.emit(event);
        });
        this.on('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.on('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
        this.on('mousemove', (event: MouseEvent) => {
            this.mousemoveEvent.emit(event);
        });
        this.on('contextmenu', (event: MouseEvent) => {
            this.contextmenuEvent.emit(event);
        });
        this.on('keypress', (event: KeyboardEvent) => {
            this.keypressEvent.emit(event);
        });
        this.on('preclick', (event: MouseEvent) => {
            this.preclickEvent.emit(event);
        });
        this.on('zoomanim', (event: ZoomAnimEvent) => {
            this.zoomanimEvent.emit(event);
        });

    }
    ngAfterViewInit(): void {
        this.domRoot.appendChild(this.mapDomRoot);

        this.invalidateSize(false);
    }

    /*setZoom(zoom: number, options?: ZoomPanOptions): this {
     if (this.zoom === zoom) {
     return;
     }
     this.zoomChange.emit(zoom);
     return super.setZoom(zoom, options)
     }*/

    // already handled with moveend
    // setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this {


    /**
     * Current zoom level `[(zoom)]`
     * @member {number} MapComponent.zoom
     */
    @Input() set zoom(val: number) {
        this.setZoom(val);
    }
    get zoom(): number {
        return this.getZoom();
    }

    /**
     * Current latitude `[(lat)]`
     * @member {number} MapComponent.lat
     */
    @Input() set lat(val: number) {
        const coords: LatLng = new LatLng(val, this.getCenter().lng);
        this.setView(coords, this.zoom);
    }
    get lat(): number {
        return this.getCenter().lat;
    }

    /**
     * Current longitude `[(lng)]`
     * @member {number} MapComponent.lng
     */
    @Input() set lng(val: number) {
        const coords: LatLng =  new LatLng(this.getCenter().lat, val);
        this.setView(coords, this.zoom);
    }
    get lng(): number {
        return this.getCenter().lng;
    }

    setMinZoom(val: number): this {
        this.minZoomChange.emit(val);
        return super.setMinZoom(val);
    }

    /**
     * Minimal zoomlevel `[(minZoom)]`
     * @member {number} MapComponent.minZoom
     */
    @Input() set minZoom(val: number) {
        this.setMinZoom(val);
    }
    get minZoom(): number {
        return this.getMinZoom();
    }

    setMaxZoom(val: number): this {
        this.maxZoomChange.emit(val);
        return super.setMaxZoom(val);
    }

    /**
     * Maximal zoomlevel `[(maxZoom)]`
     * @member {number} MapComponent.maxZoom
     */
    @Input() set maxZoom(val: number) {
        this.setMaxZoom(val);
    }
    get maxZoom(): number {
        return this.getMaxZoom();
    }

    setMaxBounds(bounds: LatLngBoundsExpression): this {
        super.setMaxBounds((<LatLngBoundsLiteral>bounds));
        this.maxBoundsChange.emit(this.maxBounds);
        return this;
    }

    /**
     * Bounds `[(maxBounds)]`
     * @member {L.LatLngBounds} MapComponent.maxBounds
     */
    @Input() set maxBounds(val: LatLngBounds) {
        this.setMaxBounds(val);
    }
    get maxBounds(): LatLngBounds {
        return (<LatLngBounds>(<MapOptions>(<any>this).options).maxBounds);
    }

    // One-way Input
    /**
     * Should the Popup close on clicks `[closePopupOnClick]`
     * @member {boolean} MapComponent.closePopupOnClick
     */
    @Input() set closePopupOnClick(val: boolean) {
        (<MapOptions>(<any>this).options).closePopupOnClick = val;
    }
    get closePopupOnClick(): boolean {
        return (<MapOptions>(<any>this).options).closePopupOnClick;
    }

    /**
     * Granularity of zoom `[zoomSnap]`
     * @member {number} MapComponent.zoomSnap
     */
    @Input() set zoomSnap(val: number) {
        (<MapOptions>(<any>this).options).zoomSnap = val;
    }
    get zoomSnap(): number {
        return (<MapOptions>(<any>this).options).zoomSnap;
    }

    /**
     * Step on zoom in or out `[zoomDelta]`
     * @member {number} MapComponent.zoomDelta
     */
    @Input() set zoomDelta(val: number) {
        (<MapOptions>(<any>this).options).zoomDelta = val;
    }
    get zoomDelta(): number {
        return (<MapOptions>(<any>this).options).zoomDelta;
    }

    /**
     * Whether the map automatically handles browser window resize to update itself `[trackResize]`
     * @member {boolean} MapComponent.trackResize
     */
    @Input() set trackResize(val: boolean) {
        (<MapOptions>(<any>this).options).trackResize = val;
    }
    get trackResize(): boolean {
        return (<MapOptions>(<any>this).options).trackResize;
    }

    // maybe 2way!?!
    /**
     * Whether the map can be zoomed to a rectangular area specified by dragging the mouse while
     * pressing the shift key `[boxZoomEnabled]`
     * @member {boolean} MapComponent.boxZoomEnabled
     */
    @Input() set boxZoomEnabled(val: boolean) {
        if (val) {
            this.boxZoom.enable();
            return;
        }
        this.boxZoom.disable();
    }
    get boxZoomEnabled(): boolean {
        return this.boxZoom.enabled();
    }

    // maybe 2way!?!
    /**
     * Whether the map can be zoomed in by double clicking on it and zoomed out by double
     * clicking while holding shift `[doubleClickZoomEnabled]`
     * @member {boolean} MapComponent.doubleClickZoomEnabled
     */
    @Input() set doubleClickZoomEnabled(val: boolean) {
        if (val) {
            this.doubleClickZoom.enable();
            return;
        }
        this.doubleClickZoom.disable();
    }
    get doubleClickZoomEnabled(): boolean {
        return this.doubleClickZoom.enabled();
    }

    // maybe 2way!?!
    /**
     * Whether the map be draggable with mouse/touch or not `[draggingEnabled]`
     * @member {boolean} MapComponent.draggingEnabled
     */
    @Input() set draggingEnabled(val: boolean) {
        if (val) {
            this.dragging.enable();
            return;
        }
        this.dragging.disable();
    }
    get draggingEnabled(): boolean {
        return this.dragging.enabled();
    }

    /**
     * Whether the tile fade animation is enabled. By default it's enabled in all browsers that
     * support CSS3 Transitions except Android `[fadeAnimation]`
     * @member {boolean} MapComponent.fadeAnimation
     */
    @Input() set fadeAnimation(val: boolean) {
        (<MapOptions>(<any>this).options).fadeAnimation = val;
    }
    get fadeAnimation(): boolean {
        return (<MapOptions>(<any>this).options).fadeAnimation;
    }

    /**
     * Whether markers animate their zoom with the zoom animation, if disabled they will
     * disappear for the length of the animation. By default it's enabled in all browsers
     * that support CSS3 Transitions except Android `[markerZoomAnimation]`
     * @member {boolean} MapComponent.markerZoomAnimation
     */
    @Input() set markerZoomAnimation(val: boolean) {
        (<MapOptions>(<any>this).options).markerZoomAnimation = val;
    }
    get markerZoomAnimation(): boolean {
        return (<MapOptions>(<any>this).options).markerZoomAnimation;
    }

    /**
     * Defines the maximum size of a CSS translation transform. The default value should not be changed
     * unless a web browser positions layers in the wrong place after doing a large panBy `[transform3DLimit]`
     * @member {number} MapComponent.transform3DLimit
     */
    @Input() set transform3DLimit(val: number) {
        (<MapOptions>(<any>this).options).transform3DLimit = val;
    }
    get transform3DLimit(): number {
        return (<MapOptions>(<any>this).options).transform3DLimit;
    }

    /**
     * Whether the map zoom animation is enabled. By default it's enabled in all browsers
     * that support CSS3 Transitions except Android `[zoomAnimation]`
     * @member {boolean} MapComponent.zoomAnimation
     */
    @Input() set zoomAnimation(val: boolean) {
        (<MapOptions>(<any>this).options).zoomAnimation = val;
    }
    get zoomAnimation(): boolean {
        return (<MapOptions>(<any>this).options).zoomAnimation;
    }

    /**
     * Won't animate zoom if the zoom difference exceeds this value `[zoomAnimationThreshold]`
     * @member {boolean} MapComponent.zoomAnimationThreshold
     */
    @Input() set zoomAnimationThreshold(val: number) {
        (<MapOptions>(<any>this).options).zoomAnimationThreshold = val;
    }
    get zoomAnimationThreshold(): number {
        return (<MapOptions>(<any>this).options).zoomAnimationThreshold;
    }

    /**
     * If enabled, panning of the map will have an inertia effect where the map builds
     * momentum while dragging and continues moving in the same direction for some time.
     * Feels especially nice on touch devices. Enabled by default unless running on old
     * Android devices `[inertia]`
     * @member {boolean} MapComponent.inertia
     */
    @Input() set inertia(val: boolean) {
        (<MapOptions>(<any>this).options).inertia = val;
    }
    get inertia(): boolean {
        return (<MapOptions>(<any>this).options).inertia;
    }

    /**
     * The rate with which the inertial movement slows down, in pixels/second `[inertiaDeclaraion]`
     * @member {number} MapComponent.inertiaDeceleration
     */
    @Input() set inertiaDeceleration(val: number) {
        (<MapOptions>(<any>this).options).inertiaDeceleration = val;
    }
    get inertiaDeceleration(): number {
        return (<MapOptions>(<any>this).options).inertiaDeceleration;
    }

    /**
     * Max speed of the inertial movement, in pixels/second `[inertiaMaxSpeed]`
     * @member {number} MapComponent.inertiaMaxSpeed
     */
    @Input() set inertiaMaxSpeed(val: number) {
        (<MapOptions>(<any>this).options).inertiaMaxSpeed = val;
    }
    get inertiaMaxSpeed(): number {
        return (<MapOptions>(<any>this).options).inertiaMaxSpeed;
    }

    /**
     * No description... `[easeLinearity]`
     * @member {number} MapComponent.easeLinearity
     */
    @Input() set easeLinearity(val: number) {
        (<MapOptions>(<any>this).options).easeLinearity = val;
    }
    get easeLinearity(): number {
        return (<MapOptions>(<any>this).options).easeLinearity;
    }

    /**
     * With this option enabled, the map tracks when you pan to another "copy" of the world and
     * seamlessly jumps to the original one so that all overlays like markers and vector layers
     * are still visible `[worldCopyJump]`
     * @member {boolean} MapComponent.worldCopyJump
     */
    @Input() set worldCopyJump(val: boolean) {
        (<MapOptions>(<any>this).options).worldCopyJump = val;
    }
    get worldCopyJump(): boolean {
        return (<MapOptions>(<any>this).options).worldCopyJump;
    }

    /**
     * f maxBounds is set, this option will control how solid the bounds are when dragging
     * the map around. The default value of 0.0 allows the user to drag outside the bounds
     * at normal speed, higher values will slow down map dragging outside bounds, and 1.0
     * makes the bounds fully solid, preventing the user from dragging outside the bounds
     * `[maxBoundsViscosity]`
     * @member {number} MapComponent.maxBoundsViscosity
     */
    @Input() set maxBoundsViscosity(val: number) {
        (<MapOptions>(<any>this).options).maxBoundsViscosity = val;
    }
    get maxBoundsViscosity(): number {
        return (<MapOptions>(<any>this).options).maxBoundsViscosity;
    }

    // maybe 2way!?!
    /**
     * Makes the map focusable and allows users to navigate the map with keyboard arrows
     * and +/- keys `[keyboardEnabled]`
     * @member {boolean} MapComponent.keyboardEnabled
     */
    @Input() set keyboardEnabled(val: boolean) {
        if (val) {
            this.keyboard.enable();
            return;
        }
        this.keyboard.disable();
    }
    get keyboardEnabled(): boolean {
        return this.keyboard.enabled();
    }

    /**
     * Amount of pixels to pan when pressing an arrow key `[keyboardPanDelta]`
     * @member {number} MapComponent.keyboardPanDelta
     */
    @Input() set keyboardPanDelta(val: number) {
        (<MapOptions>(<any>this).options).keyboardPanDelta = val;
    }
    get keyboardPanDelta(): number {
        return (<MapOptions>(<any>this).options).keyboardPanDelta;
    }

    // maybe 2way!?!
    /**
     * Whether the map can be zoomed by using the mouse wheel `[scrollWheelZoomEnabled]`
     * @member {boolean} MapComponent.scrollWheelZoomEnabled
     */
    @Input() set scrollWheelZoomEnabled(val: boolean) {
        if (val) {
            this.scrollWheelZoom.enable();
            return;
        }
        this.scrollWheelZoom.disable();
    }
    get scrollWheelZoomEnabled(): boolean {
        return this.scrollWheelZoom.enabled();
    }

    /**
     * Limits the rate at which a wheel can fire (in milliseconds). By default user can't zoom
     * via wheel more often than once per 40 ms `[wheelDebounceTime]`
     * @member {number} MapComponent.wheelDebounceTime
     */
    @Input() set wheelDebounceTime(val: number) {
        (<MapOptions>(<any>this).options).wheelDebounceTime = val;
    }
    get wheelDebounceTime(): number {
        return (<MapOptions>(<any>this).options).wheelDebounceTime;
    }

    /**
     * How many scroll pixels (as reported by L.DomEvent.getWheelDelta) mean a change of one
     * full zoom level. Smaller values will make wheel-zooming faster (and vice versa) `[wheelPxPerZoomLevel]`
     * @member {number} MapComponent.wheelPxPerZoomLevel
     */
    @Input() set wheelPxPerZoomLevel(val: number) {
        (<MapOptions>(<any>this).options).wheelPxPerZoomLevel = val;
    }
    get wheelPxPerZoomLevel(): number {
        return (<MapOptions>(<any>this).options).wheelPxPerZoomLevel;
    }


    /**
     * Enables mobile hacks for supporting instant taps (fixing 200ms click delay on iOS/Android)
     * and touch holds (fired as contextmenu events) `[tapEnabled]`
     * @member {boolean} MapComponent.tapEnabled
     */
    @Input() set tapEnabled(val: boolean) {
        (<MapOptions>(<any>this).options).tap = val;
    }
    get tapEnabled(): boolean {
        return (<MapOptions>(<any>this).options).tap;
    }

    /**
     * The max number of pixels a user can shift his finger during touch for it to be
     * considered a valid tap `[tapTolerance]`
     * @member {number} MapComponent.tapTolerance
     */
    @Input() set tapTolerance(val: number) {
        (<MapOptions>(<any>this).options).tapTolerance = val;
    }
    get tapTolerance(): number {
        return (<MapOptions>(<any>this).options).tapTolerance;
    }

    /**
     * Set it to false if you don't want the map to zoom beyond min/max zoom and then
     * bounce back when pinch-zooming `[bounceAtZoomLimits]`
     * @member {number} MapComponent.bounceAtZoomLimits
     */
    @Input() set bounceAtZoomLimits(val: boolean) {
        (<MapOptions>(<any>this).options).bounceAtZoomLimits = val;
    }
    get bounceAtZoomLimits(): boolean {
        return (<MapOptions>(<any>this).options).bounceAtZoomLimits;
    }
    // maybe 2way!?!
    /**
     * Whether the map can be zoomed by touch-dragging with two fingers `[touchZoomEnabled]`
     * @member {boolean} MapComponent.touchZoomEnabled
     */
    @Input() set touchZoomEnabled(val: boolean) {
        if (val) {
            this.touchZoom.enable();
            return;
        }
        this.touchZoom.disable();
    }
    get touchZoomEnabled(): boolean {
        return this.touchZoom.enabled();
    }
}
