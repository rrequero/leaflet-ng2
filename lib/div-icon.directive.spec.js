"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var leaflet_1 = require("leaflet");
var chai_1 = require("chai");
describe('DivIcon Directive', function () {
    var map, icon;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') });
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        icon = new index_1.DivIconDirective({ nativeElement: document.createElement('div') });
    });
    // Events
    describe('(update)', function () {
        it('should fire event in Angular when changing', function (done) {
            icon.updateEvent.subscribe(function (event) {
                chai_1.expect(event.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = leaflet_1.point(1, 2);
        });
    });
    // Inputs
    describe('[iconSize]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            chai_1.expect(icon.options.iconSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            chai_1.expect(icon.iconSize).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', function (done) {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe(function (ev) {
                chai_1.expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconSize = val;
        });
    });
    describe('[iconAnchor]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            chai_1.expect(icon.options.iconAnchor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            chai_1.expect(icon.iconAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', function (done) {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe(function (ev) {
                chai_1.expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = val;
        });
    });
    describe('[popupAnchor]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            chai_1.expect(icon.options.popupAnchor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            chai_1.expect(icon.popupAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', function (done) {
            var val = leaflet_1.point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe(function (ev) {
                chai_1.expect(ev.target).to.equal(icon);
                return done();
            });
            icon.popupAnchor = val;
        });
    });
});
//# sourceMappingURL=div-icon.directive.spec.js.map