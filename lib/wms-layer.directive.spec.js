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
describe('WMS-Layer Directive', function () {
    var map, layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        layer = new index_1.WmsLayerDirective(map);
    });
    describe('[(display)]', function () {
        it('should remove DOM container when not displaying', function () {
            layer.display = false;
            chai_1.expect(hasAsChild(layer.getPane(), layer._container)).to.equal(false);
        });
        it('should re-add DOM container when display is true again', function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(hasAsChild(layer.getPane(), layer._container)).to.equal(true);
        });
        it('should remove EventListeners when not displaying', function (done) {
            var moveEvents = map._events.move, length = moveEvents.length, originalEventListener = layer.getEvents()['move'];
            layer.display = false;
            for (var i = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            done();
        });
        it('should re-add EventListeners when display is true again', function (done) {
            var moveEvents = map._events.move, length = moveEvents.length, originalEventListener = layer.getEvents()['move'];
            layer.display = false;
            layer.display = true;
            for (var i = 0; i < length; i += 1) {
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
            /* istanbul ignore next */
            return done(new Error('There is no event on listener'));
        });
        it('should set to false by removing from map', function (done) {
            layer.displayChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(false);
                chai_1.expect(layer.display).to.equal(false);
                done();
            });
            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', function (done) {
            map.removeLayer(layer);
            layer.displayChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                chai_1.expect(layer.display).to.equal(true);
                done();
            });
            map.addLayer(layer);
        });
    });
    describe('[(url)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.url = index_1.EXAMPLE_WMS_LAYER_URL;
            chai_1.expect(layer._url).to.equal(index_1.EXAMPLE_WMS_LAYER_URL);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.url = index_1.EXAMPLE_WMS_LAYER_URL;
            chai_1.expect(layer.url).to.equal(index_1.EXAMPLE_WMS_LAYER_URL);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            layer.setUrl(index_1.EXAMPLE_WMS_LAYER_URL);
            chai_1.expect(layer.url).to.equal(index_1.EXAMPLE_WMS_LAYER_URL);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.urlChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.EXAMPLE_WMS_LAYER_URL);
                return done();
            });
            layer.url = index_1.EXAMPLE_WMS_LAYER_URL;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.url = index_1.EXAMPLE_WMS_LAYER_URL;
            layer.urlChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.EXAMPLE_WMS_LAYER_URL + '?test');
                return done();
            });
            layer.setUrl(index_1.EXAMPLE_WMS_LAYER_URL + '?test');
        });
        it('should not emit anything when changing into same url', function (done) {
            layer.setUrl(index_1.EXAMPLE_WMS_LAYER_URL);
            setTimeout(function () {
                /* istanbul ignore next */
                layer.urlChange.subscribe(function () {
                    return done(new Error('Event fired'));
                });
                layer.setUrl(index_1.EXAMPLE_WMS_LAYER_URL);
                return done();
            }, 0);
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
    describe('[(zIndex)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random();
            layer.zIndex = val;
            chai_1.expect(layer.options.zIndex).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random();
            layer.zIndex = val;
            chai_1.expect(layer.zIndex).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = Math.random();
            layer.setZIndex(val);
            chai_1.expect(layer.zIndex).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = Math.random();
            layer.zIndexChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.zIndex = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = Math.random();
            layer.zIndexChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setZIndex(val);
        });
    });
    describe('[(layers)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.layers = index_1.EXAMPLE_WMS_LAYER_NAMES;
            chai_1.expect(layer.wmsParams.layers).to.equal(index_1.EXAMPLE_WMS_LAYER_NAMES.join(','));
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.layers = index_1.EXAMPLE_WMS_LAYER_NAMES;
            chai_1.expect(layer.layers).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            layer.setParams({ layers: index_1.EXAMPLE_WMS_LAYER_NAMES.join(',') });
            chai_1.expect(layer.layers).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.layersChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });
            layer.layers = index_1.EXAMPLE_WMS_LAYER_NAMES;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.layers = index_1.EXAMPLE_WMS_LAYER_NAMES;
            layer.layersChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });
            layer.setParams({ layers: index_1.EXAMPLE_WMS_LAYER_NAMES.join(',') });
        });
    });
    describe('[(styles)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.styles = index_1.EXAMPLE_WMS_LAYER_NAMES;
            chai_1.expect(layer.wmsParams.styles).to.equal(index_1.EXAMPLE_WMS_LAYER_NAMES.join(','));
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.styles = index_1.EXAMPLE_WMS_LAYER_NAMES;
            chai_1.expect(layer.styles).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var params = Object.create(layer.wmsParams);
            params.styles = index_1.EXAMPLE_WMS_LAYER_NAMES.join(',');
            layer.setParams(params);
            chai_1.expect(layer.styles).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.stylesChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });
            layer.styles = index_1.EXAMPLE_WMS_LAYER_NAMES;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.stylesChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(index_1.EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });
            var params = Object.create(layer.wmsParams);
            params.styles = index_1.EXAMPLE_WMS_LAYER_NAMES.join(',');
            layer.setParams(params);
        });
    });
    describe('[(transparent)]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.transparent = false;
            chai_1.expect(layer.wmsParams.transparent).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.wmsParams.transparent = false;
            layer.transparent = true;
            chai_1.expect(layer.wmsParams.transparent).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.transparent = false;
            chai_1.expect(layer.transparent).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.transparent = true;
            chai_1.expect(layer.transparent).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Leaflet to false', function () {
            var params = Object.create(layer.wmsParams);
            params.transparent = false;
            layer.setParams(params);
            chai_1.expect(layer.transparent).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Leaflet to true', function () {
            var params = Object.create(layer.wmsParams);
            params.transparent = true;
            layer.setParams(params);
            chai_1.expect(layer.transparent).to.equal(true);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.transparentChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                return done();
            });
            layer.transparent = true;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.layers = index_1.EXAMPLE_WMS_LAYER_NAMES;
            layer.transparentChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                return done();
            });
            var params = Object.create(layer.wmsParams);
            params.transparent = true;
            layer.setParams(params);
        });
    });
    describe('[(format)]', function () {
        var FORMAT = 'image/png';
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.format = FORMAT;
            chai_1.expect(layer.wmsParams.format).to.equal(FORMAT);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.format = FORMAT;
            chai_1.expect(layer.format).to.equal(FORMAT);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var params = Object.create(layer.wmsParams);
            params.format = FORMAT;
            layer.setParams(params);
            chai_1.expect(layer.format).to.equal(FORMAT);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.formatChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(FORMAT);
                return done();
            });
            layer.format = FORMAT;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.formatChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(FORMAT);
                return done();
            });
            var params = Object.create(layer.wmsParams);
            params.format = FORMAT;
            layer.setParams(params);
        });
    });
    describe('[(version)]', function () {
        var VERSION = '1.0.0';
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.version = VERSION;
            chai_1.expect(layer.wmsParams.version).to.equal(VERSION);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.version = VERSION;
            chai_1.expect(layer.version).to.equal(VERSION);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var params = Object.create(layer.wmsParams);
            params.version = VERSION;
            layer.setParams(params);
            chai_1.expect(layer.version).to.equal(VERSION);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.versionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(VERSION);
                return done();
            });
            layer.version = VERSION;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.versionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(VERSION);
                return done();
            });
            var params = Object.create(layer.wmsParams);
            params.version = VERSION;
            layer.setParams(params);
        });
    });
    // Events
    describe('(add)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.removeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.popupopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.popupcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.tooltipopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.tooltipcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.dbclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.mousedownEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.mouseoverEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.mouseoutEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.contextmenuEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });
    describe('(loading)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.loadingEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('loading', testEvent);
        });
    });
    describe('(tileunload)', function () {
        beforeEach(function () {
            layer.off('tileunload', layer._onTileRemove); // Hack to disable another listener
        });
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.tileunloadEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tileunload', testEvent);
        });
    });
    describe('(tileloadstart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.tileloadstartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tileloadstart', testEvent);
        });
    });
    describe('(tileerror)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            layer.tileerrorEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tileerror', testEvent);
        });
    });
    describe('(tileload)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { testHandle: testHandle };
            var called; // this event is called multiple times in the life-circle of leaflet
            setTimeout(function () {
                layer.tileloadEvent.subscribe(function (event) {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                    called = true;
                    return done();
                });
                layer.fire('tileload', testEvent);
            }, 1);
        });
    });
    describe('(load)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {}, testEvent = { target: layer, testHandle: testHandle, type: 'load' };
            var called; // this event is called multiple times in the life-circle of leaflet
            setTimeout(function () {
                layer.loadEvent.subscribe(function (event) {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                    called = true;
                    return done();
                });
                layer.fire('load', testEvent);
            }, 1);
        });
    });
    // Inputs
    describe('[tileSize]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var num = Math.ceil(Math.random() * 1000), val = leaflet_1.point(num, num);
            layer.tileSize = val;
            chai_1.expect(layer.options.tileSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var num = Math.ceil(Math.random() * 1000), val = leaflet_1.point(num, num);
            layer.tileSize = val;
            chai_1.expect(layer.tileSize).to.equal(val);
        });
    });
    describe('[bounds]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var num = Math.ceil(Math.random() * 1000), val = leaflet_1.latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            chai_1.expect(layer.options.bounds).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var num = Math.ceil(Math.random() * 1000), val = leaflet_1.latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            chai_1.expect(layer.bounds).to.equal(val);
        });
    });
    describe('[subdomains]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = ['a', 'b', 'c', 'd'];
            layer.subdomains = val;
            chai_1.expect(layer.options.subdomains).to.deep.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = ['a', 'b', 'c', 'd'];
            layer.subdomains = val;
            chai_1.expect(layer.subdomains).to.deep.equal(val);
        });
        it('should get an array of strings even if it has a string value', function () {
            var val = 'abcdefg';
            layer.options.subdomains = val;
            chai_1.expect(layer.subdomains).to.deep.equal(val.split(''));
        });
    });
    describe('[className]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'test-class';
            layer.className = val;
            chai_1.expect(layer.options.className).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'test-class';
            layer.className = val;
            chai_1.expect(layer.className).to.equal(val);
        });
    });
    describe('[errorTileUrl]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'http://test';
            layer.errorTileUrl = val;
            chai_1.expect(layer.options.errorTileUrl).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'http://test';
            layer.errorTileUrl = val;
            chai_1.expect(layer.errorTileUrl).to.equal(val);
        });
    });
    describe('[updateInterval]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.updateInterval = val;
            chai_1.expect(layer.options.updateInterval).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.updateInterval = val;
            chai_1.expect(layer.updateInterval).to.equal(val);
        });
    });
    describe('[keepBuffer]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.keepBuffer = val;
            chai_1.expect(layer.options.keepBuffer).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.keepBuffer = val;
            chai_1.expect(layer.keepBuffer).to.equal(val);
        });
    });
    describe('[maxNativeZoom]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.maxNativeZoom = val;
            chai_1.expect(layer.options.maxNativeZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.maxNativeZoom = val;
            chai_1.expect(layer.maxNativeZoom).to.equal(val);
        });
    });
    describe('[minNativeZoom]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 5);
            layer.minNativeZoom = val;
            chai_1.expect(layer.options.minNativeZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 5);
            layer.minNativeZoom = val;
            chai_1.expect(layer.minNativeZoom).to.equal(val);
        });
    });
    describe('[zoomOffset]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.zoomOffset = val;
            chai_1.expect(layer.options.zoomOffset).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.ceil(Math.random() * 1000);
            layer.zoomOffset = val;
            chai_1.expect(layer.zoomOffset).to.equal(val);
        });
    });
    describe('[tms]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.tms = false;
            chai_1.expect(layer.options.tms).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.tms = false;
            layer.tms = true;
            chai_1.expect(layer.options.tms).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.tms = false;
            chai_1.expect(layer.tms).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.tms = true;
            chai_1.expect(layer.tms).to.equal(true);
        });
    });
    describe('[zoomReverse]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.zoomReverse = false;
            chai_1.expect(layer.options.zoomReverse).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.zoomReverse = false;
            layer.zoomReverse = true;
            chai_1.expect(layer.options.zoomReverse).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.zoomReverse = false;
            chai_1.expect(layer.zoomReverse).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.zoomReverse = true;
            chai_1.expect(layer.zoomReverse).to.equal(true);
        });
    });
    describe('[detectRetina]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.detectRetina = false;
            chai_1.expect(layer.options.detectRetina).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.detectRetina = false;
            layer.detectRetina = true;
            chai_1.expect(layer.options.detectRetina).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.detectRetina = false;
            chai_1.expect(layer.detectRetina).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.detectRetina = true;
            chai_1.expect(layer.detectRetina).to.equal(true);
        });
    });
    describe('[crossOrigin]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.crossOrigin = false;
            chai_1.expect(layer.options.crossOrigin).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.crossOrigin = false;
            layer.crossOrigin = true;
            chai_1.expect(layer.options.crossOrigin).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.crossOrigin = false;
            chai_1.expect(layer.crossOrigin).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.crossOrigin = true;
            chai_1.expect(layer.crossOrigin).to.equal(true);
        });
    });
    describe('[updateWhenIdle]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.updateWhenIdle = false;
            chai_1.expect(layer.options.updateWhenIdle).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.updateWhenIdle = false;
            layer.updateWhenIdle = true;
            chai_1.expect(layer.options.updateWhenIdle).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.updateWhenIdle = false;
            chai_1.expect(layer.updateWhenIdle).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.updateWhenIdle = true;
            chai_1.expect(layer.updateWhenIdle).to.equal(true);
        });
    });
    describe('[updateWhenZooming]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.updateWhenZooming = false;
            chai_1.expect(layer.options.updateWhenZooming).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.updateWhenZooming = false;
            layer.updateWhenZooming = true;
            chai_1.expect(layer.options.updateWhenZooming).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.updateWhenZooming = false;
            chai_1.expect(layer.updateWhenZooming).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.updateWhenZooming = true;
            chai_1.expect(layer.updateWhenZooming).to.equal(true);
        });
    });
    describe('[noWrap]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.noWrap = false;
            chai_1.expect(layer.options.noWrap).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.noWrap = false;
            layer.noWrap = true;
            chai_1.expect(layer.options.noWrap).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.noWrap = false;
            chai_1.expect(layer.noWrap).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.noWrap = true;
            chai_1.expect(layer.noWrap).to.equal(true);
        });
    });
    describe('[uppercase]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.uppercase = false;
            chai_1.expect(layer.options.uppercase).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.uppercase = false;
            layer.uppercase = true;
            chai_1.expect(layer.options.uppercase).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.uppercase = false;
            chai_1.expect(layer.uppercase).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.uppercase = true;
            chai_1.expect(layer.uppercase).to.equal(true);
        });
    });
    describe('[attribution]', function () {
        var attributionControl;
        beforeEach(function () {
            attributionControl = new index_1.AttributionControlDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'Test attribution';
            layer.attribution = val;
            chai_1.expect(layer.options.attribution).to.equal(val);
            chai_1.expect(attributionControl.attributions).to.contain(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'Test attribution';
            layer.attribution = val;
            chai_1.expect(layer.attribution).to.equal(val);
            chai_1.expect(attributionControl.attributions).to.contain(val);
        });
        it('should remove old attribution when changing in Angular', function () {
            var oldVal = 'Old test attribution';
            var newVal = 'Test attribution';
            layer.attribution = oldVal;
            layer.attribution = newVal;
            chai_1.expect(attributionControl.attributions).to.contain(newVal);
            chai_1.expect(attributionControl.attributions).to.not.contain(oldVal);
        });
    });
    describe('Destroying a WMS-Layer Directive', function () {
        it('should remove WMS-Layer Directive from map on destroy', function () {
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
//# sourceMappingURL=wms-layer.directive.spec.js.map