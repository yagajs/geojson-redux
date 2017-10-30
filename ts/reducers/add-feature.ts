import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { GeometryObject } from "geojson";
import { Action } from "redux";
import * as uuid from "uuid/v4";

export interface IGeoJSONReduxAddFeatureAction<G extends GeometryObject, P> extends Action {
    feature: GenericGeoJSONFeature<G, P>;
    type: "addFeature";
}
export function addFeatureReducer<G extends GeometryObject, P>(
    state: GenericGeoJSONFeatureCollection<G, P>,
    action: IGeoJSONReduxAddFeatureAction<G, P>,
): GenericGeoJSONFeatureCollection<G, P> {
    action.feature.id = action.feature.id || uuid(); // Enhance with an id if there is none...
    return {
        features: [...state.features, action.feature],
        type: "FeatureCollection",
    };
}
