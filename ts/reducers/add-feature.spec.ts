import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { expect } from "chai";
import { Point } from "geojson";
import { addFeatureReducer } from "./";

describe("add feature action", () => {
    it("should add a feature", () => {
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
            features: [],
            type: "FeatureCollection",
        };
        expect(addFeatureReducer(featureCollection, {
            feature,
            type: "addFeature",
        })).to.deep.equal({
            features: [feature],
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
        addFeatureReducer(featureCollection, {
            feature,
            type: "addFeature",
        });

        expect(featureCollection.features).to.deep.equal([feature]);
    });
    it("should enhance an id-less feature with one", () => {
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [0, 0],
                type: "Point",
            },
            properties: {},
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        addFeatureReducer(featureCollection, {
            feature,
            type: "addFeature",
        });

        expect(feature).to.has.property('id');
    });
});
