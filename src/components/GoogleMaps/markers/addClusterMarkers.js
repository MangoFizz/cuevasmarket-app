import {
    MarkerClusterer,
    SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";

import { addSingleMarkers } from "./addSingleMarkers";

export const addClusterMarkers = ({ locations, map }) => {
    const markers = addSingleMarkers({ locations, map });

    // Merge markers into clusters
    new MarkerClusterer({
        markers,
        map,
        algorithm: new SuperClusterAlgorithm({
            radius: 350, // cluster size
        }),
    });
};
