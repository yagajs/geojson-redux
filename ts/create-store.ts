import { GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { GeometryObject } from "geojson";
import { createStore, Store } from "redux";
import { geoJSONReducer } from "./reducers";

export function createGeoJSONStore<G extends GeometryObject, P>(): Store<GenericGeoJSONFeatureCollection<G, P>> {
    return createStore<GenericGeoJSONFeatureCollection<G, P>>(geoJSONReducer);
}
