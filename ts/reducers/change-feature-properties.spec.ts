import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { expect } from "chai";
import { Point } from "geojson";
import { changeFeaturePropertiesReducer } from "./";

describe("change feature property action", () => {
    it("should change a property", () => {
        const properties: any = {
            test: "OK",
        };
        const oldProperties: any = {
            test: "old",
        };
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [1, 1],
                type: "Point",
            },
            id: "test",
            properties: oldProperties,
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        expect(changeFeaturePropertiesReducer(featureCollection, {
            featureId: feature.id,
            properties,
            type: "changeFeatureProperties",
        })).to.deep.equal({
            features: [{
                geometry: {
                    coordinates: [1, 1],
                    type: "Point",
                },
                id: "test",
                properties,
                type: "Feature",
            }],
            type: "FeatureCollection",
        });
    });
    it("should not change property in old feature", () => {
        const properties: any = {
            test: "OK",
        };
        const oldProperties: any = {
            test: "old",
        };
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [1, 1],
                type: "Point",
            },
            id: "test",
            properties: oldProperties,
            type: "Feature",
        };
        const featureCollection: GenericGeoJSONFeatureCollection<Point, any> = {
            features: [feature],
            type: "FeatureCollection",
        };
        changeFeaturePropertiesReducer(featureCollection, {
            featureId: feature.id,
            properties,
            type: "changeFeatureProperties",
        });
        expect(feature.properties).to.not.deep.equal(properties);
    });

    it("should not change other properties of features", () => {
        const properties: any = {
            test: "OK",
        };
        const oldProperties: any = {
            test: "old",
        };
        const feature: GenericGeoJSONFeature<Point, any> = {
            geometry: {
                coordinates: [1, 1],
                type: "Point",
            },
            id: "test",
            properties: oldProperties,
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
        expect(changeFeaturePropertiesReducer(featureCollection, {
            featureId: feature.id,
            properties,
            type: "changeFeatureProperties",
        })).to.deep.equal({
            features: [
                anotherFeature,
                {
                geometry: {
                    coordinates: [1, 1],
                    type: "Point",
                },
                id: "test",
                properties,
                type: "Feature",
            }],
            type: "FeatureCollection",
        });
    });
});
