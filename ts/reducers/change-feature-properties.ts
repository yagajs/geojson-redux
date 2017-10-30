import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { GeometryObject } from "geojson";
import { Action } from "redux";

export interface IGeoJSONReduxChangeFeaturePropertiesAction<G extends GeometryObject, P> extends Action {
    featureId: string;
    properties: P;
    type: "changeFeatureProperties";
}
export function changeFeaturePropertiesReducer<G extends GeometryObject, P>(
    state: GenericGeoJSONFeatureCollection<G, P>,
    action: IGeoJSONReduxChangeFeaturePropertiesAction<G, P>,
): GenericGeoJSONFeatureCollection<G, P> {

    const features: Array<GenericGeoJSONFeature<G, P>> = [];
    for (const feature of state.features) {
        if (action.featureId === feature.id) {
            features.push({...feature, properties: action.properties});
        } else {
            features.push(feature);
        }
    }
    return {
        features,
        type: "FeatureCollection",
    };
}
