import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    ElementRef } from '@angular/core';
import { DivIcon,
    DivIconOptions,
    Event,
    Point } from 'leaflet';

@Directive({
    selector: 'yaga-icon'
})
export class DivIconDirective extends DivIcon  {
    @Output('update') public updateEvent: EventEmitter<Event> = new EventEmitter();
    protected contentHtml: HTMLElement;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef
    ) {
        super({});
        this.contentHtml = elementRef.nativeElement;
    }

    @Input() set iconSize(val: Point) {
        this.options.iconSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconSize(): Point {
        return (<Point>this.options.iconSize);
    }
    @Input() set iconAnchor(val: Point) {
        this.options.iconAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconAnchor(): Point {
        return (<Point>this.options.iconAnchor);
    }
    @Input() set popupAnchor(val: Point) {
        this.options.popupAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get popupAnchor(): Point {
        return (<Point>this.options.popupAnchor);
    }

    createIcon(oldDivIcon: HTMLElement): HTMLElement {
        let clonedOptions: DivIconOptions = Object.create(this.options);
        clonedOptions.html = '';
        oldDivIcon = super.createIcon.call({options: clonedOptions}, oldDivIcon);
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    }
}
