import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { GeometryObject } from "geojson";
import { Action } from "redux";

export interface IGeoJSONReduxChangeFeatureGeometryAction<G extends GeometryObject, P> extends Action {
    featureId: string;
    geometry: G;
    type: "changeFeatureGeometry";
}
export function changeFeatureGeometryReducer<G extends GeometryObject, P>(
    state: GenericGeoJSONFeatureCollection<G, P>,
    action: IGeoJSONReduxChangeFeatureGeometryAction<G, P>,
): GenericGeoJSONFeatureCollection<G, P> {

    const features: Array<GenericGeoJSONFeature<G, P>> = [];
    for (const feature of state.features) {
        if (action.featureId === feature.id) {
            features.push({...feature, geometry: action.geometry});
        } else {
            features.push(feature);
        }
    }
    return {
        features,
        type: "FeatureCollection",
    };
}
