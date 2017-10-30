import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { GeometryObject } from "geojson";
import { Action } from "redux";

export interface IGeoJSONReduxRemoveFeatureAction<G extends GeometryObject, P> extends Action {
    featureId: string;
    type: "removeFeature";
}
export function removeFeatureReducer<G extends GeometryObject, P>(
    state: GenericGeoJSONFeatureCollection<G, P>,
    action: IGeoJSONReduxRemoveFeatureAction<G, P>,
): GenericGeoJSONFeatureCollection<G, P> {

    const features: Array<GenericGeoJSONFeature<G, P>> = [];
    for (const feature of state.features) {
        if (feature.id !== action.featureId) {
            features.push(feature);
        }
    }
    return {
        features,
        type: "FeatureCollection",
    };
}
