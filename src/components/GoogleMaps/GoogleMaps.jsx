import { useEffect, useRef } from "react";
import { addClusterMarkers, addSingleMarkers } from "./markers";

const DEFAULT_ZOOM = 14;

const GoogleMaps = ({ locations, useClusters = true, mapId, className, center = null, getRef }) => {
    const ref = useRef(null);

    useEffect(() => {
        // Display the map
        if(ref.current) {
            if(getRef) {
                getRef(ref);
            }

            if(center === null) {
                center = locations[0];
            }

            const map = new window.google.maps.Map(ref.current, {
                center: center,
                zoom: DEFAULT_ZOOM,
                mapId,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                clickableIcons: false,
                keyboardShortcuts: false,
            });

            useClusters
                ? addClusterMarkers({ locations, map })
                : addSingleMarkers({ locations, map });
        }
    }, [ref, mapId, locations, useClusters]);

    return (
        <div className={className} ref={ref} style={{ width: "800px", height: "600px" }} />
    );
};

export default GoogleMaps;
