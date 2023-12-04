
export const addSingleMarkers = ({ locations, map }) =>
    locations.map(({ lat, lng }) => {
        const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
    });
    return marker;
});

