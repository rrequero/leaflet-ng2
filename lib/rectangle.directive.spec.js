"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var leaflet_1 = require("leaflet");
var chai_1 = require("chai");
var path_directives_spec_1 = require("./path-directives.spec");
describe('Rectangle Directive', function () {
    path_directives_spec_1.createPathTests(index_1.RectangleDirective);
    var map, layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.RectangleDirective(map);
    });
    describe('[(latlngs)]', function () {
        describe('for Polygons', function () {
            var TEST_VALUE = [[leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)]];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer._latlngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when adding in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.latLngs[0][3].lat !== 3 ||
                    layer.latLngs[0][3].lng !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.latLngs);
                }
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygons', function () {
            var TEST_VALUE = [
                [[leaflet_1.latLng(1, 0), leaflet_1.latLng(1, 1), leaflet_1.latLng(0, 1)]],
                [[leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)]]
            ];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer._latlngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when adding in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.latLngs[0][0][3].lat !== 3 ||
                    layer.latLngs[0][0][3].lng !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.latLngs[0][0]);
                }
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });
    describe('[(geoJSON)]', function () {
        describe('for Polygon', function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    type: 'Polygon'
                },
                properties: {},
                type: 'Feature'
            };
            var TEST_POLYGON = [[[0, 0], [1, 0], [1, 1], [0, 0]]];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    layer.latLngs[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    layer.latLngs[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    layer.latLngs[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    layer.latLngs[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    layer.latLngs[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                }
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_POLYGON);
                chai_1.expect(index_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_POLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.geoJSON.geometry.coordinates);
                }
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
                    chai_1.expect(index_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
                    return done();
                });
                layer.setLatLngs(TEST_POLYGON);
            });
            it('should fire an event when adding in Leaflet', function (done) {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[0][3][0] !== 3 ||
                        values[0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygon', function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [
                        [[[1, 0], [1, 1], [0, 1], [1, 0]]],
                        [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    ],
                    type: 'MultiPolygon'
                },
                properties: {},
                type: 'Feature'
            };
            var TEST_MULTIPOLYGON = [
                [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                [[[0, 0], [0, 1], [1, 1], [0, 0]]]
            ];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    layer.latLngs[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    layer.latLngs[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    layer.latLngs[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    layer.latLngs[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    layer.latLngs[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||
                    layer.latLngs[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    layer.latLngs[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    layer.latLngs[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    layer.latLngs[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    layer.latLngs[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    layer.latLngs[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                }
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                chai_1.expect(index_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][0][3][1] !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.geoJSON.geometry.coordinates);
                }
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
                    chai_1.expect(index_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
                    return done();
                });
                layer.setLatLngs(TEST_MULTIPOLYGON);
            });
            it('should fire an event when adding in Leaflet', function (done) {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[0][0][3][0] !== 3 ||
                        values[0][0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });
    describe('[(bounds)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            chai_1.expect(layer.getBounds().equals(val)).to.equal(true);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            chai_1.expect(layer.bounds.equals(val)).to.equal(true);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = leaflet_1.latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.setBounds(val);
            chai_1.expect(layer.bounds.equals(val)).to.equal(true);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = leaflet_1.latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.boundsChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.equals(val)).to.equal(true);
                done();
            });
            layer.ngAfterViewInit();
            layer.bounds = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = leaflet_1.latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.boundsChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.equals(val)).to.equal(true);
                done();
            });
            layer.ngAfterViewInit();
            layer.setBounds(val);
        });
    });
    describe('[(north)]', function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random();
            layer.north = val;
            chai_1.expect(layer.getBounds().getNorth()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random();
            layer.north = val;
            chai_1.expect(layer.north).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random();
            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
            chai_1.expect(layer.north).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random();
            layer.northChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.north = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random();
            layer.northChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
        });
    });
    describe('[(east)]', function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random();
            layer.east = val;
            chai_1.expect(layer.getBounds().getEast()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random();
            layer.east = val;
            chai_1.expect(layer.east).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random();
            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
            chai_1.expect(layer.east).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random();
            layer.eastChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.east = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random();
            layer.eastChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
        });
    });
    describe('[(south)]', function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random();
            layer.south = val;
            chai_1.expect(layer.getBounds().getSouth()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random();
            layer.south = val;
            chai_1.expect(layer.south).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random();
            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
            chai_1.expect(layer.south).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random();
            layer.southChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.south = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random();
            layer.southChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
        });
    });
    describe('[(west)]', function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random();
            layer.west = val;
            chai_1.expect(layer.getBounds().getWest()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random();
            layer.west = val;
            chai_1.expect(layer.west).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random();
            layer.setBounds(leaflet_1.latLngBounds([
                [0, val],
                [1, 1]
            ]));
            chai_1.expect(layer.west).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random();
            layer.westChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.west = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random();
            layer.westChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterViewInit();
            layer.setBounds([
                [0, val],
                [1, 1]
            ]);
        });
    });
    describe('[smoothFactor]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            chai_1.expect(layer.options.smoothFactor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            chai_1.expect(layer.smoothFactor).to.equal(val);
        });
    });
    describe('[properties]', function () {
        var layerWithProperties;
        var TEST_OBJECT = {
            test: 'OK'
        };
        beforeEach(function () {
            layerWithProperties = new index_1.RectangleDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            layerWithProperties.properties = TEST_OBJECT;
            chai_1.expect(layerWithProperties.feature.properties).to.deep.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layerWithProperties.properties = TEST_OBJECT;
            chai_1.expect(layerWithProperties.properties).to.deep.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', function (done) {
            layerWithProperties.geoJSONChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.properties).to.deep.equal(TEST_OBJECT);
                done();
            });
            layerWithProperties.properties = TEST_OBJECT;
        });
    });
    describe('[noClip]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.noClip = false;
            chai_1.expect(layer.options.noClip).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.noClip = false;
            layer.noClip = true;
            chai_1.expect(layer.options.noClip).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.noClip = false;
            chai_1.expect(layer.noClip).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.noClip = true;
            chai_1.expect(layer.noClip).to.equal(true);
        });
    });
    describe('Popup in Rectangle Directive', function () {
        var layerWithPopup, popup, testDiv;
        before(function () {
            testDiv = document.createElement('div');
            popup = new index_1.PopupDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new index_1.RectangleDirective(map), { popupDirective: { value: popup } });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', function () {
            chai_1.expect(layerWithPopup._popup).to.equal(popup);
        });
    });
    describe('Tooltip in Rectangle Directive', function () {
        var layerWithTooltip, tooltip, testDiv;
        before(function () {
            testDiv = document.createElement('div');
            tooltip = new index_1.TooltipDirective(map, { nativeElement: testDiv });
            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new index_1.RectangleDirective(map), { tooltipDirective: { value: tooltip } });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', function () {
            chai_1.expect(layerWithTooltip._tooltip).to.equal(tooltip);
        });
    });
    describe('Destroying a Rectangle Directive', function () {
        it('should remove Rectangle Directive from map on destroy', function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
        });
    });
});
//# sourceMappingURL=rectangle.directive.spec.js.map