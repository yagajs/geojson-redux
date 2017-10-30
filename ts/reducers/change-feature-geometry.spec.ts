import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { expect } from "chai";
import { Point } from "geojson";
import { changeFeatureGeometryReducer } from "./";

describe("change feature geometry action", () => {
    it("should change a geometry", () => {
        const geometry: Point = {
            coordinates: [125.6, 10.1],
            type: "Point",
        };
        const oldGeometry: Point = {
            coordinates: [1, 2],
            type: "Point",
        };
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: oldGeometry,
            id: "test",
            properties: {},
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        expect(changeFeatureGeometryReducer(featureCollection, {
            featureId: feature.id,
            geometry,
            type: "changeFeatureGeometry",
        })).to.deep.equal({
            features: [{
                geometry,
                id: "test",
                properties: {},
                type: "Feature",
            }],
            type: "FeatureCollection",
        });
    });
    it("should not change geometry in old feature", () => {
        const geometry: Point = {
            coordinates: [125.6, 10.1],
            type: "Point",
        };
        const oldGeometry: Point = {
            coordinates: [1, 2],
            type: "Point",
        };
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: oldGeometry,
            id: "test",
            properties: {},
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        expect(changeFeatureGeometryReducer(featureCollection, {
            featureId: feature.id,
            geometry,
            type: "changeFeatureGeometry",
        }).features).to.not.deep.equal([feature]);
    });
    it("should not change a geometry of another feature", () => {
        const geometry: Point = {
            coordinates: [125.6, 10.1],
            type: "Point",
        };
        const oldGeometry: Point = {
            coordinates: [1, 2],
            type: "Point",
        };
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: oldGeometry,
            id: "test",
            properties: {},
            type: "Feature",
        };
        const anotherFeature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [1, 1],
                type: "Point",
            },
            id: "another",
            properties: {},
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [anotherFeature, feature],
            type: "FeatureCollection",
        };
        expect(changeFeatureGeometryReducer(featureCollection, {
            featureId: feature.id,
            geometry,
            type: "changeFeatureGeometry",
        })).to.deep.equal({
            features: [
                anotherFeature,
                {
                    geometry,
                    id: "test",
                    properties: {},
                    type: "Feature",
                },
            ],
            type: "FeatureCollection",
        });
    });
});
