import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { TileLayer,
    TileLayerOptions,
    LatLngBoundsExpression,
    Point,
    Map,
    Event,
    PopupEvent,
    TooltipEvent,
    TileEvent,
    TileErrorEvent } from 'leaflet';
import { MapComponent } from './map.component';

/**
 * @classdesc [Leaflet Tile-Layer](http://leafletjs.com/reference-1.0.2.html#tilelayer)
 * @class L.TileLayer
 * @link http://leafletjs.com/reference-1.0.2.html#tilelayer
 */

/**
 * Yaga Tile-Layer Directive
 * @extends L.TileLayer
 * @class TileLayerDirective
 * @classdesc Yaga Tile-Layer Directive `<yaga-tile-layer>`
 * @param {MapComponent} mapComponent - ForwardRef to MapComponent (@Injected)
 */
@Directive({
    selector: 'yaga-tile-layer'
})
export class TileLayerDirective extends TileLayer implements OnDestroy  {
    /**
     * Emitter for change on property url `[(url)]`
     * @member TileLayerDirective.urlChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    /**
     * Emitter for change on property display `[(display)]`
     * @member TileLayerDirective.displayChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Emitter for change on property opacity `[(opacity)]`
     * @member TileLayerDirective.opacityChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Emitter for change on property zIndex `[(zIndex)]`
     * @member TileLayerDirective.zIndexChange
     * @type {"@angular/core".EventEmitter}
     */
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    /**
     * Piped event `(add)`
     * @member TileLayerDirective.addEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(remove)`
     * @member TileLayerDirective.removeEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(popupopen)`
     * @member TileLayerDirective.popupopenEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * Piped event `(popupclose)`
     * @member TileLayerDirective.popupcloseEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * Piped event `(tooltipopen)`
     * @member TileLayerDirective.tooltipopenEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * Piped event `(tooltipclose)`
     * @member TileLayerDirective.tooltipcloseEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * Piped event `(click)`
     * @member TileLayerDirective.clickEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(dbclick)`
     * @member TileLayerDirective.dbclickEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('dbclick') public dbclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mousedown)`
     * @member TileLayerDirective.mousedownEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mouseover)`
     * @member TileLayerDirective.mouseoverEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(mouseout)`
     * @member TileLayerDirective.mouseoutEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(contextmenu)`
     * @member TileLayerDirective.contextmenuEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Piped event `(loading)`
     * @member TileLayerDirective.loadingEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('loading') public loadingEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Piped event `(tileunload)`
     * @member TileLayerDirective.tileunloadEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tileunload') public tileunloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * Piped event `(tileloadstart)`
     * @member TileLayerDirective.tileloadstartEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tileloadstart') public tileloadstartEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * Piped event `(tileerror)`
     * @member TileLayerDirective.tileerrorEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tileerror') public tileerrorEvent: EventEmitter<TileErrorEvent> = new EventEmitter();
    /**
     * Piped event `(tileload)`
     * @member TileLayerDirective.tileloadEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('tileload') public tileloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * Piped event `(load)`
     * @member TileLayerDirective.loadEvent
     * @type {"@angular/core".EventEmitter}
     */
    @Output('load') public loadEvent: EventEmitter<Event> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        // Transparent 1px image:
        super('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });

        this.addTo(mapComponent);

        // Events
        this.on('add', (event: Event) => {
            this.addEvent.emit(event);
        });
        this.on('remove', (event: Event) => {
            this.removeEvent.emit(event);
        });
        this.on('popupopen', (event: PopupEvent) => {
            this.popupopenEvent.emit(event);
        });
        this.on('popupclose', (event: PopupEvent) => {
            this.popupcloseEvent.emit(event);
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
        this.on('dbclick', (event: MouseEvent) => {
            this.dbclickEvent.emit(event);
        });
        this.on('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.on('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.on('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
        this.on('contextmenu', (event: MouseEvent) => {
            this.contextmenuEvent.emit(event);
        });
        this.on('loading', (event: Event) => {
            this.loadingEvent.emit(event);
        });
        this.on('tileunload', (event: TileEvent) => {
            this.tileunloadEvent.emit(event);
        });
        this.on('tileloadstart', (event: TileEvent) => {
            this.tileloadstartEvent.emit(event);
        });
        this.on('tileerror', (event: TileErrorEvent) => {
            this.tileerrorEvent.emit(event);
        });
        this.on('tileload', (event: TileEvent) => {
            this.tileloadEvent.emit(event);
        });
        this.on('load', (event: Event) => {
            this.loadEvent.emit(event);
        });
    }

    ngOnDestroy(): void {
        console.log('Destroy');
        this.removeFrom((<any>this)._map);
    }

    setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url, noRedraw);
    }

    /**
     * Url template for tile layers `[(url)]`
     * @member {string} TileLayerDirective.url
     */
    @Input() set url(val: string) {
        this.setUrl(val);
    }
    get url(): string {
        return (<any>this)._url;
    }


    setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }

    /**
     * Opacity of the tiles `[(opacity)]`
     * @member {number} TileLayerDirective.opacity
     */
    @Input() set opacity(val: number) {
        this.setOpacity(val);
    }
    get opacity(): number {
        return (<TileLayerOptions>(<any>this).options).opacity;
    }


    /**
     * Whether the layer is displayed `[(display)]`
     * @member {boolean} TileLayerDirective.display
     */
    @Input() set display(val: boolean) {
        var isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        var pane: HTMLElement,
            container: HTMLElement,
            map: Map,
            events: any, // Dictionary of functions
            eventKeys: string[];
        try {
            pane = this.getPane();
            container = this.getContainer();
            map = (<any>this)._map;
            events = this.getEvents();
            eventKeys = Object.keys(events);
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        if (val) {
            // show layer
            pane.appendChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.on(eventKeys[i], events[eventKeys[i]], this);
            }
            this.redraw();
        } else {
            // hide layer
            pane.removeChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.off(eventKeys[i], events[eventKeys[i]], this);
            }
        }
    }
    get display(): boolean {
        var pane: HTMLElement,
            container: HTMLElement;
        try {
            pane = this.getPane();
            container = this.getContainer();
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        for (let i: number = 0; i < pane.children.length; i += 1) {
            /* istanbul ignore else */
            if (pane.children[i] === container) {
                return true;
            }
        }
        return false;
    }

    setZIndex(val: number): this {
        super.setZIndex(val);
        this.zIndexChange.emit(val);
        return this;
    }

    /**
     * The explicit zIndex of the tile layer `[(zIndex)]`
     * @member {number} TileLayerDirective.zIndex
     */
    @Input() set zIndex(val: number) {
        this.setZIndex(val);
    }
    get zIndex(): number {
        return (<TileLayerOptions>(<any>this).options).zIndex;
    }

    /**
     * Width and height of tiles in the grid `[tileSize]`
     * @member {Point} TileLayerDirective.tileSize
     */
    @Input() set tileSize(val: Point) {
        (<TileLayerOptions>(<any>this).options).tileSize = val;
    }
    get tileSize(): Point { // TODO: is this correct that it is always a Point?
        return (<Point>(<TileLayerOptions>(<any>this).options).tileSize);
    }

    /**
     * If false, new tiles are loaded during panning, otherwise only after it (for better performance)
     * true by default on mobile browsers, otherwise false `[updateWhenIdle]`
     * @member {boolean} TileLayerDirective.updateWhenIdle
     */
    @Input() set updateWhenIdle(val: boolean) {
        (<TileLayerOptions>(<any>this).options).updateWhenIdle = val;
    }
    get updateWhenIdle(): boolean {
        return (<TileLayerOptions>(<any>this).options).updateWhenIdle;
    }

    /**
     * By default, a smooth zoom animation (during a touch zoom or a flyTo()) will update grid layers
     * every integer zoom level. Setting this option to false will update the grid layer only when the
     * smooth animation ends `[updateWhenZooming]`
     * @member {boolean} TileLayerDirective.updateWhenZooming
     */
    @Input() set updateWhenZooming(val: boolean) {
        (<TileLayerOptions>(<any>this).options).updateWhenZooming = val;
    }
    get updateWhenZooming(): boolean {
        return (<TileLayerOptions>(<any>this).options).updateWhenZooming;
    }

    /**
     * Tiles will not update more than once every updateInterval milliseconds when panning `[updateInterval]`
     * @member {number} TileLayerDirective.updateInterval
     */
    @Input() set updateInterval(val: number) {
        (<TileLayerOptions>(<any>this).options).updateInterval = val;
    }
    get updateInterval(): number {
        return (<TileLayerOptions>(<any>this).options).updateInterval;
    }

    /**
     * If set, tiles will only be loaded inside the set LatLngBounds `[bounds]`
     * @member {LatLngBoundsExpression} TileLayerDirective.bounds
     */
    @Input() set bounds(val: LatLngBoundsExpression) {
        (<TileLayerOptions>(<any>this).options).bounds = val;
    }
    get bounds(): LatLngBoundsExpression {
        return (<TileLayerOptions>(<any>this).options).bounds;
    }

    /**
     * Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be
     * displayed once at low zoom levels. Has no effect when the map CRS doesn't wrap around `[noWrap]`
     * @member {boolean} TileLayerDirective.noWrap
     */
    @Input() set noWrap(val: boolean) {
        (<TileLayerOptions>(<any>this).options).noWrap = val;
    }
    get noWrap(): boolean {
        return (<TileLayerOptions>(<any>this).options).noWrap;
    }

    /**
     * A custom class name to assign to the tile layer. Empty by default `[className]`
     * @member {string} TileLayerDirective.className
     */
    @Input() set className(val: string) {
        (<TileLayerOptions>(<any>this).options).className = val;
    }
    get className(): string {
        return (<TileLayerOptions>(<any>this).options).className;
    }

    /**
     * When panning the map, keep this many rows and columns of tiles before unloading them `[keepBuffer]`
     * @member {number} TileLayerDirective.keepBuffer
     */
    @Input() set keepBuffer(val: number) {
        (<TileLayerOptions>(<any>this).options).keepBuffer = val;
    }
    get keepBuffer(): number {
        return (<TileLayerOptions>(<any>this).options).keepBuffer;
    }

    /**
     * Maximum zoom number the tile source has available. If it is specified, the tiles on all zoom
     * levels higher than maxNativeZoom will be loaded from maxNativeZoom level
     * and auto-scaled `[maxNativeZoom]`
     * @member {number} TileLayerDirective.maxNativeZoom
     */
    @Input() set maxNativeZoom(val: number) {
        (<TileLayerOptions>(<any>this).options).maxNativeZoom = val;
    };
    get maxNativeZoom(): number {
        return (<TileLayerOptions>(<any>this).options).maxNativeZoom;
    }

    /**
     * Subdomains of the tile service `[subdomains]`
     * @member {string[]} TileLayerDirective.subdomains
     */
    @Input() set subdomains(val: string[]) {
        (<TileLayerOptions>(<any>this).options).subdomains = val;
    };
    get subdomains(): string[] {
        if (typeof (<string>(<TileLayerOptions>(<any>this).options).subdomains) === 'string') {
            (<TileLayerOptions>(<any>this).options).subdomains = (<string>(<TileLayerOptions>(<any>this).options).subdomains).split('');
        }
        return (<string[]>(<TileLayerOptions>(<any>this).options).subdomains);
    }

    /**
     * URL to the tile image to show in place of the tile that failed to load `[errorTileUrl]`
     * @member {string} TileLayerDirective.errorTileUrl
     */
    @Input() set errorTileUrl(val: string) {
        (<TileLayerOptions>(<any>this).options).errorTileUrl = val;
    };
    get errorTileUrl(): string {
        return (<TileLayerOptions>(<any>this).options).errorTileUrl;
    }

    /**
     * The zoom number used in tile URLs will be offset with this value `[zoomOffset]`
     * @member {number} TileLayerDirective.zoomOffset
     */
    @Input() set zoomOffset(val: number) {
        (<TileLayerOptions>(<any>this).options).zoomOffset = val;
    };
    get zoomOffset(): number {
        return (<TileLayerOptions>(<any>this).options).zoomOffset;
    }

    /**
     * If true, inverses Y axis numbering for tiles (turn this on for TMS services) `[tms]`
     * @member {boolean} TileLayerDirective.tms
     */
    @Input() set tms(val: boolean) {
        (<TileLayerOptions>(<any>this).options).tms = val;
    };
    get tms(): boolean {
        return (<TileLayerOptions>(<any>this).options).tms;
    }

    /**
     * If set to true, the zoom number used in tile URLs will be reversed
     * (maxZoom - zoom instead of zoom) `[zoomReverse]`
     * @member {boolean} TileLayerDirective.zoomReverse
     */
    @Input() set zoomReverse(val: boolean) {
        (<TileLayerOptions>(<any>this).options).zoomReverse = val;
    };
    get zoomReverse(): boolean {
        return (<TileLayerOptions>(<any>this).options).zoomReverse;
    }

    /**
     * If true and user is on a retina display, it will request four tiles of half the
     * specified size and a bigger zoom level in place of one to utilize
     * the high resolution `[detectRetina]`
     * @member {boolean} TileLayerDirective.detectRetina
     */
    @Input() set detectRetina(val: boolean) {
        (<TileLayerOptions>(<any>this).options).detectRetina = val;
    };
    get detectRetina(): boolean {
        return (<TileLayerOptions>(<any>this).options).detectRetina;
    }

    /**
     * If true, all tiles will have their crossOrigin attribute set to ''.
     * This is needed if you want to access tile pixel data `[crossOrigin]`
     * @member {boolean} TileLayerDirective.crossOrigin
     */
    @Input() set crossOrigin(val: boolean) {
        (<TileLayerOptions>(<any>this).options).crossOrigin = val;
    };
    get crossOrigin(): boolean {
        return (<TileLayerOptions>(<any>this).options).crossOrigin;
    }
}
