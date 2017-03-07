"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
describe('GeoJSON Directive', function () {
    var map, layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.GeoJSONDirective(map);
    });
    var TEST_VALUE = {
        features: [
            {
                geometry: {
                    coordinates: [7, 51],
                    type: 'Point'
                },
                properties: {
                    test: 'OK'
                },
                type: 'Feature'
            }
        ],
        type: 'FeatureCollection'
    };
    describe('[(data)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.data = TEST_VALUE;
            chai_1.expect(layer.toGeoJSON()).to.deep.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.data = TEST_VALUE;
            chai_1.expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should be changed data in Angular when changing in Leaflet', function () {
            layer.setData(TEST_VALUE);
            chai_1.expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
            layer.addData(TEST_VALUE.features[0]);
            chai_1.expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.dataChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.data = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.dataChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.setData(TEST_VALUE);
        });
        it('should fire an event when adding in Leaflet', function (done) {
            layer.ngAfterViewInit();
            layer.dataChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.addData(TEST_VALUE.features[0]);
        });
    });
    var testHandle = {};
    var testEvent = { testHandle: testHandle };
    describe('(add)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.removeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.popupopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.popupcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.tooltipopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.tooltipcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.dbclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.mousedownEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.mouseoverEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.mouseoutEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.contextmenuEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });
    describe('Popup in GeoJSON Directive', function () {
        var popup, testDiv, puLayer;
        before(function () {
            testDiv = document.createElement('div');
            popup = new index_1.PopupDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            puLayer = Object.create(new index_1.GeoJSONDirective(map), { popupDirective: { value: popup } });
        });
        it('should bind popup', function () {
            puLayer.ngAfterViewInit();
            chai_1.expect(puLayer._popup).to.equal(popup);
        });
    });
    describe('Tooltip in GeoJSON Directive', function () {
        var tooltip, testDiv, ttLayer;
        before(function () {
            testDiv = document.createElement('div');
            tooltip = new index_1.TooltipDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            ttLayer = Object.create(new index_1.GeoJSONDirective(map), { tooltipDirective: { value: tooltip } });
        });
        it('should bind tooltip', function () {
            ttLayer.ngAfterViewInit();
            chai_1.expect(ttLayer.tooltipDirective).to.equal(tooltip);
            // expect((<any>layer)._tooltip).to.equal(tooltip);
        });
    });
    describe('Destroying a GeoJSON Directive', function () {
        it('should remove Polyline Directive from map on destroy', function () {
            /* istanbul ignore if */
            if (!map.hasLayer(layer)) {
                throw new Error('The layer is not part of the map before destroying');
            }
            layer.ngOnDestroy();
            /* istanbul ignore if */
            if (map.hasLayer(layer)) {
                throw new Error('The layer is still part of the map after destroying');
            }
        });
    });
});
//# sourceMappingURL=geojson.directive.spec.js.map