import React from "react";
import "./Marker.css";
import { Marker } from "react-google-maps";

interface ILatLon {
  lng: number;
  lat: number;
}
interface IProps {
  ClusterCount: number;
  latLon: ILatLon;
}

var clusterCircle = {
  path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
  fillColor: "#699ff5",
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 0.75
};

const ClusterMarker: React.FC<IProps> = ({ ClusterCount, latLon }) => {
  return (
    <Marker
      position={latLon}
      label={ClusterCount.toString()}
      icon={clusterCircle}
    >
      {ClusterCount}
    </Marker>
  );
};

export default ClusterMarker;
