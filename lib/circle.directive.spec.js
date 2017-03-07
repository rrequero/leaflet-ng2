"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var leaflet_1 = require("leaflet");
var path_directives_spec_1 = require("./path-directives.spec");
var chai_1 = require("chai");
describe('Circle Directive', function () {
    var map, layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.CircleDirective(map);
        layer.ngAfterViewInit();
    });
    path_directives_spec_1.createPathTests(index_1.CircleDirective);
    describe('[(position)]', function () {
        var TEST_VALUE = leaflet_1.latLng(0, 1);
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.position = TEST_VALUE;
            chai_1.expect(layer._latlng).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.position = TEST_VALUE;
            chai_1.expect(layer.position).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            layer.setLatLng(TEST_VALUE);
            chai_1.expect(layer.position).to.equal(TEST_VALUE);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(TEST_VALUE);
                return done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(TEST_VALUE);
                return done();
            });
            layer.setLatLng(TEST_VALUE);
        });
        it('should fire geoJSON-change event when changing in Angular', function (done) {
            layer.geoJSONChange.subscribe(function () {
                return done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire geoJSON-change event when changing in Leaflet', function (done) {
            layer.geoJSONChange.subscribe(function () {
                return done();
            });
            layer.setLatLng(TEST_VALUE);
        });
    });
    describe('[(lat)]', function () {
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
    describe('[(radius)]', function () {
        var TEST_VALUE = leaflet_1.latLng(0, 1);
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random() * 100;
            layer.radius = val;
            chai_1.expect(layer.getRadius()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random() * 100;
            layer.radius = val;
            chai_1.expect(layer.radius).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random() * 100;
            layer.setRadius(val);
            chai_1.expect(layer.radius).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random() * 100;
            layer.radiusChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.radius = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random() * 100;
            layer.radiusChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setRadius(val);
        });
    });
    describe('[(geoJSON)]', function () {
        var TEST_VALUE = {
            geometry: {
                coordinates: [1, 3],
                type: 'Point'
            },
            properties: {},
            type: 'Feature'
        };
        var TEST_POINT = [3, 4];
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.geoJSON = TEST_VALUE;
            chai_1.expect(layer.position.lng).to.equal(TEST_VALUE.geometry.coordinates[0]);
            chai_1.expect(layer.position.lat).to.equal(TEST_VALUE.geometry.coordinates[1]);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.geoJSON = TEST_VALUE;
            chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
        });
        it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
            layer.setLatLng(TEST_POINT);
            chai_1.expect(layer.geoJSON.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
            chai_1.expect(layer.geoJSON.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.geoJSONChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.geoJSON = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.geoJSONChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
                chai_1.expect(eventVal.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
                return done();
            });
            layer.setLatLng(TEST_POINT);
        });
    });
    describe('[properties]', function () {
        var TEST_OBJECT = {
            test: 'OK'
        };
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.properties = TEST_OBJECT;
            chai_1.expect(layer.feature.properties).to.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.properties = TEST_OBJECT;
            chai_1.expect(layer.properties).to.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', function (done) {
            layer.geoJSONChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.properties).to.equal(TEST_OBJECT);
                return done();
            });
            layer.properties = TEST_OBJECT;
        });
    });
    describe('Popup in Circle Directive', function () {
        var layerWithPopup, popup, testDiv;
        before(function () {
            testDiv = document.createElement('div');
            popup = new index_1.PopupDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new index_1.CircleDirective(map), { popupDirective: { value: popup } });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', function () {
            chai_1.expect(layerWithPopup._popup).to.equal(popup);
        });
    });
    describe('Tooltip in Circle Directive', function () {
        var layerWithTooltip, tooltip, testDiv;
        before(function () {
            map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
            map._size = leaflet_1.point(100, 100);
            map._pixelOrigin = leaflet_1.point(50, 50);
            map._renderer = map._renderer || new leaflet_1.SVG();
            testDiv = document.createElement('div');
            tooltip = new index_1.TooltipDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new index_1.CircleDirective(map), { tooltipDirective: { value: tooltip } });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', function () {
            chai_1.expect(layerWithTooltip._tooltip).to.equal(tooltip);
        });
    });
    describe('Destroying a Circle Directive', function () {
        it('should remove Circle Directive from map on destroy', function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            chai_1.expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
//# sourceMappingURL=circle.directive.spec.js.map