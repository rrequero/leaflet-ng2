"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var chai_1 = require("chai");
describe('lng2lat helper', function () {
    it('should convert a Point', function () {
        var lat = Math.floor(Math.random() * 1000000) / 10000;
        var lng = Math.floor(Math.random() * 1000000) / 10000;
        var geom = [lat, lng];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([lng, lat]);
    });
    it('should convert a LineString or Multipoint', function () {
        var lat1 = Math.floor(Math.random() * 1000000) / 10000;
        var lng1 = Math.floor(Math.random() * 1000000) / 10000;
        var lat2 = Math.floor(Math.random() * 1000000) / 10000;
        var lng2 = Math.floor(Math.random() * 1000000) / 10000;
        var geom = [[lat1, lng1], [lat2, lng2]];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([[lng1, lat1], [lng2, lat2]]);
    });
    it('should convert a MultiLineString or Polygon', function () {
        var lat1 = Math.floor(Math.random() * 1000000) / 10000;
        var lng1 = Math.floor(Math.random() * 1000000) / 10000;
        var lat2 = Math.floor(Math.random() * 1000000) / 10000;
        var lng2 = Math.floor(Math.random() * 1000000) / 10000;
        var lat3 = Math.floor(Math.random() * 1000000) / 10000;
        var lng3 = Math.floor(Math.random() * 1000000) / 10000;
        var lat4 = Math.floor(Math.random() * 1000000) / 10000;
        var lng4 = Math.floor(Math.random() * 1000000) / 10000;
        var geom = [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]]);
    });
    it('should convert a MultiPolygon', function () {
        var lat1 = Math.floor(Math.random() * 1000000) / 10000;
        var lng1 = Math.floor(Math.random() * 1000000) / 10000;
        var lat2 = Math.floor(Math.random() * 1000000) / 10000;
        var lng2 = Math.floor(Math.random() * 1000000) / 10000;
        var lat3 = Math.floor(Math.random() * 1000000) / 10000;
        var lng3 = Math.floor(Math.random() * 1000000) / 10000;
        var lat4 = Math.floor(Math.random() * 1000000) / 10000;
        var lng4 = Math.floor(Math.random() * 1000000) / 10000;
        var lat5 = Math.floor(Math.random() * 1000000) / 10000;
        var lng5 = Math.floor(Math.random() * 1000000) / 10000;
        var lat6 = Math.floor(Math.random() * 1000000) / 10000;
        var lng6 = Math.floor(Math.random() * 1000000) / 10000;
        var lat7 = Math.floor(Math.random() * 1000000) / 10000;
        var lng7 = Math.floor(Math.random() * 1000000) / 10000;
        var lat8 = Math.floor(Math.random() * 1000000) / 10000;
        var lng8 = Math.floor(Math.random() * 1000000) / 10000;
        var geom = [
            [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]],
            [[[lat5, lng5], [lat6, lng6]], [[lat7, lng7], [lat8, lng8]]]
        ];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([
            [[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]],
            [[[lng5, lat5], [lng6, lat6]], [[lng7, lat7], [lng8, lat8]]]
        ]);
    });
});
//# sourceMappingURL=lng2lat.spec.js.map