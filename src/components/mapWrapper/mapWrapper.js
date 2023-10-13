import React from "react";
import './mapWrapper.css';

const MapWrapper = React.memo(
    () => {
        return <div id="map-container"></div>;
    },
    () => true,
);

export default MapWrapper;