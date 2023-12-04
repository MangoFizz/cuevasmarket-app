import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../../config";

const GoogleMapsWrapper = ({ children }) => {
    return (
        <Wrapper
            apiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
            language="es"
            region="MX"
        >
            {children}
        </Wrapper>
    );
}

export default GoogleMapsWrapper;
