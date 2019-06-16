import React, { useState, useEffect } from "react";
import { withProps, compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import { IGpsLocaiton } from "../IGPSLocation";

const DEFAULT_VIEWPORT = {
  center: { lat: 28.040578, lng: -82.506877 },
  zoom: 3
};

interface ICustomerMapState {
  positions: IGpsLocaiton[];
}
interface ICustomerMapProp {
  maxPositions: number;
}

const ClusterMap: React.StatelessComponent<ICustomerMapProp> = props => {
  const [data, setData] = useState<ICustomerMapState>({ positions: [] });
  const { maxPositions } = props;

  const getPositions = async () => {
    for (let i = 0; i < maxPositions / 1000; i++) {
      fetch(
        "http://localhost:3001/positions?_limit=" + maxPositions + "&_page=" + i
      )
        .then(resp => resp.json())
        .then(positions => {
          setData({ positions });
        });
    }
  };

  useEffect(() => {
    getPositions();
  }, [maxPositions]);

  return (
    <div>
      <GoogleMap
        defaultZoom={DEFAULT_VIEWPORT.zoom}
        defaultCenter={DEFAULT_VIEWPORT.center}
      >
        {data.positions.map(pos => (
          <Marker
            key={pos.id}
            position={{ lat: pos.latitude, lng: pos.longitude }}
          />
        ))}
      </GoogleMap>
      <div>Displaying {data.positions.length} Positions</div>
    </div>
  );
};

const enahnced = compose<ICustomerMapProp, ICustomerMapProp>(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" +
      process.env.REACT_APP_GOOGLE_MAPS_API,
    loadingElement: <div style={{ height: `90%`, width: "100vw" }} />,
    containerElement: (
      <div style={{ height: `400px`, width: "100%", margin: "auto auto" }} />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
);

export default enahnced(ClusterMap);
