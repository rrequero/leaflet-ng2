"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var leaflet_1 = require("leaflet");
var chai_1 = require("chai");
describe('Attribution-Control Directive', function () {
    var map, control;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        control = new index_1.AttributionControlDirective(map);
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
                done();
            });
            control.position = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = 'topleft';
            control.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            control.setPosition(val);
        });
    });
    describe('[(prefix)]', function () {
        it('should be set to YAGA | leaflet-ng2 by default', function () {
            var html = control.getContainer().innerHTML;
            chai_1.expect(html.indexOf('>YAGA<' + '> | <' + '>leaflet-ng2<')).to.not.equal(-3);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'Attribution-Prefix';
            control.prefix = val;
            chai_1.expect(control.options.prefix).to.equal(val);
            var html = control.getContainer().innerHTML;
            chai_1.expect(html.indexOf(val)).to.not.equal(-1);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'Attribution-Prefix';
            control.prefix = val;
            chai_1.expect(control.prefix).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = 'Attribution-Prefix';
            control.setPrefix(val);
            chai_1.expect(control.prefix).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = 'Attribution-Prefix';
            control.prefixChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            control.prefix = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = 'Attribution-Prefix';
            control.prefixChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            control.setPrefix(val);
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
    describe('Destroying a Attribution Control Directive', function () {
        it('should remove Tile-Layer Directive from map on destroy', function () {
            chai_1.expect(control.getContainer().parentElement.parentElement.parentElement).to.equal(map.getContainer());
            control.ngOnDestroy();
            chai_1.expect(control.getContainer() &&
                control.getContainer().parentElement &&
                control.getContainer().parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement).to.not.equal(map.getContainer());
        });
    });
});
//# sourceMappingURL=attribution-control.directive.spec.js.map