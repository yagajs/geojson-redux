import { GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { GeometryObject } from "geojson";

import { addFeatureReducer, IGeoJSONReduxAddFeatureAction} from "./add-feature";
import { changeFeatureGeometryReducer, IGeoJSONReduxChangeFeatureGeometryAction } from "./change-feature-geometry";
import {
    changeFeaturePropertiesReducer,
    IGeoJSONReduxChangeFeaturePropertiesAction,
} from "./change-feature-properties";
import { IGeoJSONReduxRemoveFeatureAction, removeFeatureReducer } from "./remove-feature";

export * from "./add-feature";
export * from "./change-feature-geometry";
export * from "./remove-feature";
export * from "./change-feature-properties";

const initialState: any  = {
    features: [],
    type: "FeatureCollection",
};

export type IGeoJSONReduxAction<G extends GeometryObject, P> = IGeoJSONReduxAddFeatureAction<G, P>
    | IGeoJSONReduxRemoveFeatureAction<G, P>
    | IGeoJSONReduxChangeFeatureGeometryAction<G, P>
    | IGeoJSONReduxChangeFeaturePropertiesAction<G, P>;

export function geoJSONReducer<G extends GeometryObject, P>(
    state: GenericGeoJSONFeatureCollection<G, P> = initialState,
    action: IGeoJSONReduxAction<G, P>,
): GenericGeoJSONFeatureCollection<G, P> {
    switch (action.type) {
        case "addFeature":
            return addFeatureReducer(state, action as IGeoJSONReduxAddFeatureAction<G, P>);
        case "removeFeature":
            return removeFeatureReducer(state, action as IGeoJSONReduxRemoveFeatureAction<G, P>);
        case "changeFeatureGeometry":
            return changeFeatureGeometryReducer(state, action as IGeoJSONReduxChangeFeatureGeometryAction<G, P>);
        case "changeFeatureProperties":
            return changeFeaturePropertiesReducer(state, action as IGeoJSONReduxChangeFeaturePropertiesAction<G, P>);
    }
    return state;
}
