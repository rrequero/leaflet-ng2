"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var leaflet_1 = require("leaflet");
var chai_1 = require("chai");
function hasAsChild(root, child) {
    'use strict';
    var length = root.children.length;
    for (var i = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}
describe('Marker Directive', function () {
    var map, layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        layer = new index_1.MarkerDirective(map);
    });
    describe('[(display)]', function () {
        it('should remove DOM container when not displaying', function () {
            layer.display = false;
            chai_1.expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(false);
        });
        it('should re-add DOM container when display is true again', function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(true);
        });
        it('should remove EventListeners when not displaying', function (done) {
            var zoomEvents = map._events.zoom, length = zoomEvents.length, originalEventListener = layer.getEvents()['zoom'];
            layer.display = false;
            for (var i = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            done();
        });
        it('should re-add EventListeners when display is true again', function (done) {
            var zoomEvents = map._events.zoom, length = zoomEvents.length, originalEventListener = layer.getEvents()['zoom'];
            layer.display = false;
            layer.display = true;
            for (var i = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
        });
        it('should set to false by removing from map', function (done) {
            layer.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(false);
                chai_1.expect(layer.display).to.equal(false);
                done();
            });
            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', function (done) {
            map.removeLayer(layer);
            layer.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(true);
                chai_1.expect(layer.display).to.equal(true);
                done();
            });
            map.addLayer(layer);
        });
    });
    describe('[(opacity)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random();
            layer.opacity = val;
            chai_1.expect(layer.options.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random();
            layer.opacity = val;
            chai_1.expect(layer.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random();
            layer.setOpacity(val);
            chai_1.expect(layer.opacity).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random();
            layer.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.opacity = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random();
            layer.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setOpacity(val);
        });
    });
    describe('[(lat)]', function () {
        beforeEach(function () {
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random() * 100;
            layer.lat = val;
            chai_1.expect(layer.getLatLng().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random() * 100;
            layer.lat = val;
            chai_1.expect(layer.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random() * 100;
            layer.setLatLng([val, 0]);
            chai_1.expect(layer.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random() * 100;
            layer.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random() * 100;
            layer.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', function () {
        beforeEach(function () {
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random() * 100;
            layer.lng = val;
            chai_1.expect(layer.getLatLng().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random() * 100;
            layer.lng = val;
            chai_1.expect(layer.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random() * 100;
            layer.setLatLng([0, val]);
            chai_1.expect(layer.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random() * 100;
            layer.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random() * 100;
            layer.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setLatLng([0, val]);
        });
    });
    describe('[(position)]', function () {
        beforeEach(function () {
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.position = val;
            chai_1.expect(layer.getLatLng()).to.deep.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.position = val;
            chai_1.expect(layer.position).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = leaflet_1.latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.setLatLng(val);
            chai_1.expect(layer.position).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = leaflet_1.latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(val);
                return done();
            });
            layer.position = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = leaflet_1.latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(val);
                return done();
            });
            layer.setLatLng(val);
        });
    });
    // TODO: icon
    describe('[title]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'http://test';
            layer.title = val;
            chai_1.expect(layer.options.title).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'http://test';
            layer.title = val;
            chai_1.expect(layer.title).to.equal(val);
        });
    });
    describe('[alt]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'http://test';
            layer.alt = val;
            chai_1.expect(layer.options.alt).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'http://test';
            layer.alt = val;
            chai_1.expect(layer.alt).to.equal(val);
        });
    });
    describe('[draggable]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.draggable = false;
            chai_1.expect(layer.dragging.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.dragging.disable();
            layer.draggable = true;
            chai_1.expect(layer.dragging.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.draggable = false;
            chai_1.expect(layer.draggable).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.draggable = true;
            chai_1.expect(layer.draggable).to.equal(true);
        });
    });
    // Events
    describe('(dragend)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.dragendEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dragend', testEvent);
        });
    });
    describe('(dragstart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.dragstartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dragstart', testEvent);
        });
    });
    describe('(movestart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.movestartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('movestart', testEvent);
        });
    });
    describe('(drag)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.dragEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('drag', testEvent);
        });
    });
    describe('(moveend)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.moveendEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('moveend', testEvent);
        });
    });
    describe('Popup in Marker Directive', function () {
        var layerWithPopup, popup, testDiv;
        before(function () {
            testDiv = document.createElement('div');
            popup = new index_1.PopupDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new index_1.MarkerDirective(map), { popupDirective: { value: popup } });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', function () {
            chai_1.expect(layerWithPopup._popup).to.equal(popup);
        });
    });
    describe('Tooltip in Marker Directive', function () {
        var layerWithTooltip, tooltip, testDiv;
        before(function () {
            testDiv = document.createElement('div');
            tooltip = new index_1.TooltipDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new index_1.MarkerDirective(map), { tooltipDirective: { value: tooltip } });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', function () {
            chai_1.expect(layerWithTooltip._tooltip).to.equal(tooltip);
        });
    });
    describe('Icon in Marker Directive', function () {
        var layerWithIcon, icon, testDiv;
        before(function () {
            testDiv = document.createElement('div');
            icon = new index_1.IconDirective();
            icon.iconUrl = index_1.TRANSPARENT_PIXEL;
            // Hack to get write-access to readonly property
            layerWithIcon = Object.create(new index_1.MarkerDirective(map), { iconDirective: { value: icon } });
            layerWithIcon.ngAfterViewInit();
        });
        it('should bind icon', function () {
            chai_1.expect(layerWithIcon._icon.getAttribute('src')).to.equal(index_1.TRANSPARENT_PIXEL);
        });
        it('should bind icon again on changes in icon directive', function () {
            var TEST_VALUE = 'path/to/icon.png';
            icon.iconUrl = TEST_VALUE;
            chai_1.expect(layerWithIcon._icon.getAttribute('src')).to.equal(TEST_VALUE);
        });
    });
    describe('Destroying a Marker Directive', function () {
        it('should remove Marker Directive from map on destroy', function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            chai_1.expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
//# sourceMappingURL=marker.directive.spec.js.map