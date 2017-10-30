import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { expect } from "chai";
import { Point } from "geojson";
import { removeFeatureReducer } from "./";

describe("remove feature action", () => {
    it("should remove a feature", () => {
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [0, 0],
                type: "Point",
            },
            id: "test",
            properties: {},
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        expect(removeFeatureReducer(featureCollection, {
            featureId: feature.id,
            type: "removeFeature",
        })).to.deep.equal({
            features: [],
            type: "FeatureCollection",
        });
    });
    it("should not change feature in old collection", () => {
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [0, 0],
                type: "Point",
            },
            id: "test",
            properties: {},
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        removeFeatureReducer(featureCollection, {
            featureId: feature.id,
            type: "removeFeature",
        });

        expect(featureCollection.features).to.deep.equal([feature]);
    });
    it("should not remove another feature", () => {
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [0, 0],
                type: "Point",
            },
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
        expect(removeFeatureReducer(featureCollection, {
            featureId: feature.id,
            type: "removeFeature",
        })).to.deep.equal({
            features: [anotherFeature],
            type: "FeatureCollection",
        });
    });
});
