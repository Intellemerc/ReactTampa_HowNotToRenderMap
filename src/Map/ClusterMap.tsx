import React from "react";
import { withProps, compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import { IGpsLocation } from "../IGPSLocation";

const DEFAULT_VIEWPORT = {
  center: { lat: 37.040578, lng: -98.506877 },
  zoom: 5
};

interface IClusterMapProps {
  positions?: IGpsLocation[];
}

const getMarkers = (positions: IGpsLocation[]) => {
  return positions.map(pos => (
    <Marker key={pos.id} position={{ lat: pos.latitude, lng: pos.longitude }} />
  ));
};

const ClusterMap: React.StatelessComponent<IClusterMapProps> = props => {
  const { positions } = props;
  const markers = getMarkers(positions);
  return (
    <>
      <GoogleMap
        defaultZoom={DEFAULT_VIEWPORT.zoom}
        defaultCenter={DEFAULT_VIEWPORT.center}
      >
        {positions ? (
          <MarkerClusterer gridSize={100}>{markers}</MarkerClusterer>
        ) : null}
      </GoogleMap>
      <div>markers loaded: {markers.length}</div>
    </>
  );
};

const enahnced = compose<IClusterMapProps, IClusterMapProps>(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" +
      process.env.REACT_APP_GOOGLE_MAPS_API,
    loadingElement: <div style={{ height: `90%`, width: "100vw" }} />,
    containerElement: (
      <div
        style={{
          height: `600px`,
          width: "100%",
          margin: "auto auto"
        }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
);

export default enahnced(ClusterMap);
