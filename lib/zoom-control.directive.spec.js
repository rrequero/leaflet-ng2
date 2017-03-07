"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var leaflet_1 = require("leaflet");
var chai_1 = require("chai");
describe('Zoom-Control Directive', function () {
    var map, control;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        control = new index_1.ZoomControlDirective(map);
    });
    describe('[(position)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'topright';
            control.position = val;
            chai_1.expect(control.getPosition()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'topright';
            control.position = val;
            chai_1.expect(control.position).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = 'topright';
            control.setPosition(val);
            chai_1.expect(control.position).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = 'topleft';
            control.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            control.position = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = 'topleft';
            control.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            control.setPosition(val);
        });
    });
    // Events
    describe('(add)', function () {
        it('should fire an event when adding to map', function (done) {
            map.removeControl(control);
            control.addEvent.subscribe(function () {
                done();
            });
            map.addControl(control);
        });
    });
    describe('(remove)', function () {
        it('should fire an event when removing from map', function (done) {
            control.removeEvent.subscribe(function () {
                done();
            });
            map.removeControl(control);
        });
    });
    describe('(click)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.clickEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('click'));
        });
    });
    describe('(dbclick)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.dbclickEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('dbclick'));
        });
    });
    describe('(mousedown)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.mousedownEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mousedown'));
        });
    });
    describe('(mouseover)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.mouseoverEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseover'));
        });
    });
    describe('(mouseout)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.mouseoutEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseout'));
        });
    });
    describe('[opacity]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = Math.random() * 100;
            control.opacity = val;
            chai_1.expect(control.getContainer().style.opacity).to.equal(val.toString());
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = Math.random() * 100;
            control.opacity = val;
            chai_1.expect(control.opacity).to.equal(val);
        });
    });
    describe('[zoomInText]', function () {
        var TEST_VALUE = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', function () {
            control.zoomInText = TEST_VALUE;
            chai_1.expect(control.options.zoomInText).to.equal(TEST_VALUE);
            chai_1.expect(control._zoomInButton.textContent).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            control.zoomInText = TEST_VALUE;
            chai_1.expect(control.zoomInText).to.equal(TEST_VALUE);
        });
    });
    describe('[zoomOutText]', function () {
        var TEST_VALUE = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', function () {
            control.zoomOutText = TEST_VALUE;
            chai_1.expect(control.options.zoomOutText).to.equal(TEST_VALUE);
            chai_1.expect(control._zoomOutButton.textContent).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            control.zoomOutText = TEST_VALUE;
            chai_1.expect(control.zoomOutText).to.equal(TEST_VALUE);
        });
    });
    describe('[zoomInTitle]', function () {
        var TEST_VALUE = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', function () {
            control.zoomInTitle = TEST_VALUE;
            chai_1.expect(control.options.zoomInTitle).to.equal(TEST_VALUE);
            chai_1.expect(control._zoomInButton.getAttribute('title')).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            control.zoomInTitle = TEST_VALUE;
            chai_1.expect(control.zoomInTitle).to.equal(TEST_VALUE);
        });
    });
    describe('[zoomOutTitle]', function () {
        var TEST_VALUE = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', function () {
            control.zoomOutTitle = TEST_VALUE;
            chai_1.expect(control.options.zoomOutTitle).to.equal(TEST_VALUE);
            chai_1.expect(control._zoomOutButton.getAttribute('title')).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            control.zoomOutTitle = TEST_VALUE;
            chai_1.expect(control.zoomOutTitle).to.equal(TEST_VALUE);
        });
    });
    describe('Destroying a Zoom Control Directive', function () {
        it('should remove Tile-Layer Directive from map on destroy', function () {
            /* istanbul ignore if */
            if (control.getContainer().parentElement.parentElement.parentElement !== map.getContainer()) {
                throw new Error('The control is not part of the map before destroying');
            }
            control.ngOnDestroy();
            /* istanbul ignore if */
            if (control.getContainer() &&
                control.getContainer().parentElement &&
                control.getContainer().parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement === map.getContainer()) {
                throw new Error('The layer is still part of the map after destroying');
            }
        });
    });
});
//# sourceMappingURL=zoom-control.directive.spec.js.map